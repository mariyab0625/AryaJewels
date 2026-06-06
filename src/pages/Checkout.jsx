import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const inputStyle = {
  width: "100%", padding: "12px 14px",
  fontFamily: "Inter, sans-serif", fontSize: "13px",
  border: "1px solid rgba(46,34,30,0.2)",
  backgroundColor: "#FDF6F0", color: "#2E221E",
  outline: "none", boxSizing: "border-box",
};
const labelStyle = {
  fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500,
  letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B5750",
  display: "block", marginBottom: "6px",
};

function MapPicker({ position, onSelect }) {
  function ClickHandler() {
    useMapEvents({
      click(e) { onSelect([e.latlng.lat, e.latlng.lng]); },
    });
    return null;
  }
  return (
    <MapContainer
      center={position || [20.5937, 78.9629]}
      zoom={position ? 14 : 5}
      scrollWheelZoom={false}
      style={{ height: "280px", width: "100%", borderRadius: "0", zIndex: 0 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors' />
      <ClickHandler />
      {position && <Marker position={position} />}
    </MapContainer>
  );
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, addOrder, addAddress, addresses } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=delivery 2=confirm
  const [mapPos, setMapPos] = useState(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [saveAddr, setSaveAddr] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState(null);

  const [form, setForm] = useState({
    name: user?.name || "", phone: "", pincode: "",
    flatNo: "", area: "", city: "", state: "", landmark: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const shipping = cartTotal >= 999 ? 0 : 199;
  const grandTotal = cartTotal + shipping;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
  }, []);

  // Pincode autofill using Indian postal API
  const handlePincode = async (pin) => {
    setForm((f) => ({ ...f, pincode: pin }));
    if (pin.length === 6) {
      setPincodeLoading(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();
        if (data[0].Status === "Success") {
          const po = data[0].PostOffice[0];
          setForm((f) => ({ ...f, city: po.District, state: po.State, area: po.Name }));
          // Geocode the pincode to center map
          const geo = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pin}&country=India&format=json&limit=1`);
          const geoData = await geo.json();
          if (geoData[0]) setMapPos([parseFloat(geoData[0].lat), parseFloat(geoData[0].lon)]);
        }
      } catch { /* silent */ }
      setPincodeLoading(false);
    }
  };

  const fillFromSaved = (addr) => {
    setSelectedAddr(addr.id);
    setForm({ name: addr.name, phone: addr.phone, pincode: addr.pincode, area: addr.area, city: addr.city, state: addr.state, landmark: addr.landmark || "" });
    if (addr.lat && addr.lng) setMapPos([addr.lat, addr.lng]);
  };

  const handleMapSelect = async (pos) => {
    setMapPos(pos);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${pos[0]}&lon=${pos[1]}&format=json&addressdetails=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      const a = data.address || {};
      setForm((f) => ({
        ...f,
        area:    a.suburb || a.neighbourhood || a.village || a.town || f.area,
        city:    a.city || a.district || a.county || f.city,
        state:   a.state || f.state,
        pincode: a.postcode || f.pincode,
      }));
    } catch { /* silent — map pin still placed */ }
  };

  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");

  const useCurrentLocation = () => {
    setLocError("");
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        await handleMapSelect(coords);
        setLocLoading(false);
      },
      (err) => {
        setLocLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocError("Location access denied. Please enable location permissions in your browser settings and try again.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setLocError("Location unavailable. Try pinning your location on the map manually.");
        } else {
          setLocError("Could not fetch your location. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePlaceOrder = () => {
    if (saveAddr && user) {
      addAddress({ ...form, lat: mapPos?.[0], lng: mapPos?.[1] });
    }
    addOrder({ items: cartItems, total: grandTotal, address: form, mapPos });
    if (typeof clearCart === "function") clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <main style={{ backgroundColor: "var(--color-bg-main)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{ width: "72px", height: "72px", backgroundColor: "#CE7661", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <span style={{ color: "white", fontSize: "30px" }}>✓</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: 300, color: "#2E221E", marginBottom: "12px" }}>Order Placed!</h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", lineHeight: 1.8, marginBottom: "8px" }}>
            Thank you, {form.name}. Your jewellery is on its way.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#CE7661", marginBottom: "32px" }}>
            Delivering to {form.area}, {form.city} — {form.pincode}
          </p>
          <button onClick={() => navigate("/shop")} style={{ backgroundColor: "#CE7661", color: "white", border: "none", padding: "14px 32px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer" }}>
            Continue Shopping
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--color-bg-main)", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#2E221E", padding: "40px 48px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#EBC9BE", marginBottom: "8px" }}>ARYAjewels</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: "#FDF6F0" }}>Checkout</h1>
        </div>
      </div>

      <div className="page-content-pad" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="checkout-layout" style={{ width: "100%" }}>
        {/* Left — Delivery form */}
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, color: "#2E221E", marginBottom: "28px" }}>Delivery Details</h2>

          {/* Saved addresses */}
          {user && addresses.length > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <p style={labelStyle}>Saved Addresses</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {addresses.map((addr) => (
                  <button key={addr.id} onClick={() => fillFromSaved(addr)}
                    style={{ textAlign: "left", padding: "14px 16px", border: `1px solid ${selectedAddr === addr.id ? "#CE7661" : "rgba(46,34,30,0.15)"}`, backgroundColor: selectedAddr === addr.id ? "#fff0ee" : "transparent", cursor: "pointer", transition: "all 0.2s" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "#2E221E", marginBottom: "2px" }}>{addr.name}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078" }}>{addr.area}, {addr.city}, {addr.state} — {addr.pincode}</p>
                  </button>
                ))}
              </div>
              <div style={{ height: "1px", backgroundColor: "rgba(46,34,30,0.1)", margin: "20px 0" }} />
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} type="text" value={form.name} onChange={set("name")} placeholder="Recipient name" required
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Phone Number</label>
              <input style={inputStyle} type="tel" value={form.phone} onChange={set("phone")} placeholder="10-digit mobile number" required
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Flat / House No. / Building</label>
              <input style={inputStyle} type="text" value={form.flatNo} onChange={set("flatNo")} placeholder="e.g. Flat 4B, Sunshine Apartments"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>Pincode {pincodeLoading && <span style={{ color: "#CE7661" }}>…</span>}</label>
              <input style={inputStyle} type="text" value={form.pincode} onChange={(e) => handlePincode(e.target.value)} placeholder="6-digit pincode" maxLength={6}
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>Area / Locality</label>
              <input style={inputStyle} type="text" value={form.area} onChange={set("area")} placeholder="Area or locality"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input style={inputStyle} type="text" value={form.city} onChange={set("city")} placeholder="City"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <input style={inputStyle} type="text" value={form.state} onChange={set("state")} placeholder="State"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Landmark (optional)</label>
              <input style={inputStyle} type="text" value={form.landmark} onChange={set("landmark")} placeholder="Near school, temple, etc."
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
          </div>

          {/* Map */}
          <div style={{ marginTop: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={14} color="#CE7661" />
                <p style={{ ...labelStyle, marginBottom: 0 }}>Pin your exact location (optional)</p>
              </div>
              <button
                type="button"
                onClick={useCurrentLocation}
                disabled={locLoading}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "none", border: "1px solid rgba(206,118,97,0.4)",
                  padding: "6px 14px", cursor: locLoading ? "not-allowed" : "pointer",
                  fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#CE7661", opacity: locLoading ? 0.6 : 1,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { if (!locLoading) { e.currentTarget.style.backgroundColor = "#CE7661"; e.currentTarget.style.color = "white"; }}}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#CE7661"; }}
              >
                <MapPin size={11} />
                {locLoading ? "Detecting…" : "Use My Location"}
              </button>
            </div>

            {locError && (
              <div style={{ backgroundColor: "#FFF0F0", border: "1px solid rgba(185,64,64,0.2)", padding: "10px 14px", marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "#B94040", flexShrink: 0, marginTop: "1px" }}>⚠</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#B94040", lineHeight: 1.6 }}>{locError}</p>
              </div>
            )}

            <MapPicker position={mapPos} onSelect={handleMapSelect} />
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", marginTop: "6px" }}>
              Use <strong>+/−</strong> buttons to zoom · Click to drop a pin
            </p>
            {mapPos && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#CE7661", marginTop: "4px" }}>📍 Location pinned — address fields updated</p>}
          </div>

          {user && (
            <label style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px", cursor: "pointer" }}>
              <input type="checkbox" checked={saveAddr} onChange={(e) => setSaveAddr(e.target.checked)} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B5750" }}>Save this address for future orders</span>
            </label>
          )}

          <button onClick={handlePlaceOrder}
            disabled={!form.name || !form.phone || !form.pincode || !form.city}
            style={{ marginTop: "32px", width: "100%", backgroundColor: "#CE7661", color: "white", border: "none", padding: "15px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", opacity: (!form.name || !form.phone || !form.pincode || !form.city) ? 0.5 : 1, transition: "background 0.2s" }}
            onMouseEnter={(e) => { if (form.name && form.phone && form.pincode && form.city) e.currentTarget.style.backgroundColor = "#B9523C"; }}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#CE7661"}
          >
            Place Order — ₹{grandTotal.toLocaleString("en-IN")}
          </button>
        </div>

        {/* Right — Order summary */}
        <div style={{ position: "sticky", top: "80px", backgroundColor: "#F7F1EB", padding: "28px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 400, color: "#2E221E", marginBottom: "20px" }}>Your Order</h3>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <img src={item.image} alt={item.name} style={{ width: "56px", height: "64px", objectFit: "cover", backgroundColor: "#F2EDE4", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontWeight: 400, color: "#2E221E", lineHeight: 1.3 }}>{item.name}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", marginTop: "2px" }}>Qty: {item.quantity}</p>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#2E221E", flexShrink: 0 }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
            </div>
          ))}
          <div style={{ height: "1px", backgroundColor: "rgba(46,34,30,0.1)", margin: "16px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B5750" }}>Subtotal</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#2E221E" }}>₹{cartTotal.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B5750" }}>Shipping</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: shipping === 0 ? "#CE7661" : "#2E221E" }}>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: "#2E221E" }}>Total</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 600, color: "#2E221E" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
