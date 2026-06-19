import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, MapPin, LogOut, Edit2, X, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "orders",  label: "Orders",  Icon: Package },
  { id: "addresses", label: "Addresses", Icon: MapPin },
];

function ProfileTab({ user, updateProfile, logout, navigate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);

  const save = () => { updateProfile({ name }); setEditing(false); };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "36px" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#EBC9BE", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
          {user.avatar ? <img src={user.avatar} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#2E221E" }}>{user.name?.[0]?.toUpperCase()}</span>}
        </div>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, color: "#2E221E" }}>{user.name}</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078", marginTop: "4px" }}>{user.email}</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
        <div>
          <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B5750", display: "block", marginBottom: "6px" }}>Full Name</label>
          {editing ? (
            <div style={{ display: "flex", gap: "8px" }}>
              <input value={name} onChange={(e) => setName(e.target.value)} style={{ flex: 1, padding: "11px 14px", fontFamily: "Inter, sans-serif", fontSize: "13px", border: "1px solid #CE7661", backgroundColor: "#FDF6F0", color: "#2E221E", outline: "none" }} />
              <button onClick={save} style={{ background: "#CE7661", border: "none", padding: "0 14px", cursor: "pointer", color: "white" }}><Check size={15} /></button>
              <button onClick={() => { setEditing(false); setName(user.name); }} style={{ background: "none", border: "1px solid rgba(46,34,30,0.2)", padding: "0 12px", cursor: "pointer", color: "#8A8078" }}><X size={15} /></button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#2E221E", padding: "11px 0" }}>{user.name}</p>
              <button onClick={() => setEditing(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#CE7661" }}><Edit2 size={14} /></button>
            </div>
          )}
        </div>
        <div>
          <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B5750", display: "block", marginBottom: "6px" }}>Email</label>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", padding: "11px 0" }}>{user.email}</p>
        </div>
        <div>
          <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B5750", display: "block", marginBottom: "6px" }}>Member Since</label>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", padding: "11px 0" }}>{new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}</p>
        </div>
      </div>

      <button onClick={() => { logout(); navigate("/"); }} style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "8px", background: "none", border: "1px solid rgba(46,34,30,0.2)", padding: "12px 20px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2E221E", transition: "all 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#CE7661"; e.currentTarget.style.color = "#CE7661"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(46,34,30,0.2)"; e.currentTarget.style.color = "#2E221E"; }}>
        <LogOut size={14} /> Sign Out
      </button>
    </div>
  );
}

function OrdersTab({ orders }) {
  if (orders.length === 0) return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <Package size={32} color="#EBC9BE" style={{ marginBottom: "16px" }} />
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#2E221E", marginBottom: "8px" }}>No orders yet</p>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078" }}>Your order history will appear here.</p>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid rgba(46,34,30,0.1)", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A8078", marginBottom: "4px" }}>
                Order #{String(order.id).slice(-6)}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078" }}>
                {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <span style={{ backgroundColor: "#F0F9F0", color: "#2E7D32", fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 12px" }}>
              {order.status}
            </span>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
            {order.items?.map((item) => (
              <img key={item.id} src={item.image} alt={item.name} style={{ width: "52px", height: "60px", objectFit: "cover", backgroundColor: "#F2EDE4" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B5750" }}>
              {order.address?.area}, {order.address?.city}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: "#2E221E" }}>
              ₹{order.total?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AddressesTab({ addresses, removeAddress, addAddress }) {
  const [showForm, setShowForm] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", flatNo: "", area: "", city: "", state: "", pincode: "", landmark: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleCity = async (city) => {
    setForm((f) => ({ ...f, city }));
    if (city.length < 3) return;
    setCityLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&country=India&format=json&limit=1`, { headers: { "Accept-Language": "en" } });
      const data = await res.json();
      if (data[0]) {
        const parts = data[0].display_name.split(", ");
        const state = parts[parts.length - 2] || "";
        // Try postcode
        const detailRes = await fetch(`https://nominatim.openstreetmap.org/details?osmtype=${data[0].osm_type.charAt(0).toUpperCase()}&osmid=${data[0].osm_id}&format=json&addressdetails=1`);
        const detail = await detailRes.json();
        const postcode = detail?.address?.postcode || "";
        setForm((f) => ({ ...f, state: f.state || state, pincode: f.pincode || postcode }));
      }
    } catch { /* silent */ }
    setCityLoading(false);
  };

  const handleSave = () => {
    if (!form.name || !form.phone || !form.city) return;
    addAddress(form);
    setForm({ name: "", phone: "", flatNo: "", area: "", city: "", state: "", pincode: "", landmark: "" });
    setShowForm(false);
  };

  const inputStyle = { width: "100%", padding: "10px 12px", fontFamily: "Inter, sans-serif", fontSize: "12px", border: "1px solid rgba(46,34,30,0.2)", backgroundColor: "#FDF6F0", color: "#2E221E", outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B5750", display: "block", marginBottom: "5px" };

  return (
    <div>
      {/* Add button */}
      <div style={{ marginBottom: "24px" }}>
        <button onClick={() => setShowForm((s) => !s)} style={{ display: "inline-flex", alignItems: "center", gap: "7px", backgroundColor: "#CE7661", color: "white", border: "none", padding: "11px 20px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>
          {showForm ? "Cancel" : "+ Add New Address"}
        </button>
      </div>

      {/* Inline add form */}
      {showForm && (
        <div style={{ border: "1px solid rgba(46,34,30,0.12)", padding: "24px", marginBottom: "28px", backgroundColor: "#F7F1EB" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 400, color: "#2E221E", marginBottom: "20px" }}>New Address</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} type="text" value={form.name} onChange={set("name")} placeholder="Recipient name"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} type="tel" value={form.phone} onChange={set("phone")} placeholder="10-digit number"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Flat / House No.</label>
              <input style={inputStyle} type="text" value={form.flatNo} onChange={set("flatNo")} placeholder="e.g. Flat 4B, Sunshine Apts"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>City {cityLoading && <span style={{ color: "#CE7661" }}>…</span>}</label>
              <input style={inputStyle} type="text" value={form.city} onChange={(e) => handleCity(e.target.value)} placeholder="City"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <input style={inputStyle} type="text" value={form.state} onChange={set("state")} placeholder="Auto-filled"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>Area / Locality</label>
              <input style={inputStyle} type="text" value={form.area} onChange={set("area")} placeholder="Area"
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>Pincode</label>
              <input style={inputStyle} type="text" value={form.pincode} onChange={set("pincode")} placeholder="Auto-filled" maxLength={6}
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Landmark (optional)</label>
              <input style={inputStyle} type="text" value={form.landmark} onChange={set("landmark")} placeholder="Near temple, school, etc."
                onFocus={(e) => e.target.style.borderColor = "#CE7661"} onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"} />
            </div>
          </div>
          <button onClick={handleSave} disabled={!form.name || !form.phone || !form.city}
            style={{ marginTop: "16px", backgroundColor: "#CE7661", color: "white", border: "none", padding: "12px 24px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", opacity: (!form.name || !form.phone || !form.city) ? 0.5 : 1 }}>
            Save Address
          </button>
        </div>
      )}

      {/* Saved addresses */}
      {addresses.length === 0 && !showForm ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <MapPin size={32} color="#EBC9BE" style={{ marginBottom: "16px" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#2E221E", marginBottom: "8px" }}>No saved addresses</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078" }}>Add an address above.</p>
        </div>
      ) : (
        <div className="addresses-grid">
          {addresses.map((addr) => (
            <div key={addr.id} style={{ border: "1px solid rgba(46,34,30,0.1)", padding: "20px", position: "relative" }}>
              <button onClick={() => removeAddress(addr.id)} style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", color: "#8A8078" }}><X size={13} /></button>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "#2E221E", marginBottom: "6px" }}>{addr.name}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B5750", lineHeight: 1.6 }}>
                {addr.flatNo && `${addr.flatNo}, `}{addr.area}, {addr.landmark && `${addr.landmark}, `}{addr.city}<br />{addr.state} — {addr.pincode}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078", marginTop: "6px" }}>{addr.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  const { user, logout, updateProfile, orders, addresses, removeAddress, addAddress } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <main style={{ backgroundColor: "var(--color-bg-main)", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#2E221E", padding: "40px 48px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#EBC9BE", marginBottom: "8px" }}>ARYAjewels</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: "#FDF6F0" }}>My Account</h1>
        </div>
      </div>

      <div className="page-content-pad" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Sidebar tabs */}
        <div className="profile-layout">
          <div className="profile-sidebar" style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {tabs.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "none", border: "none", cursor: "pointer",
              padding: "12px 16px", textAlign: "left",
              backgroundColor: activeTab === id ? "#F7F1EB" : "transparent",
              borderLeft: activeTab === id ? "2px solid #CE7661" : "2px solid transparent",
              fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: activeTab === id ? 600 : 400,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: activeTab === id ? "#CE7661" : "#6B5750",
              transition: "all 0.2s",
            }}>
              <Icon size={14} /> {label}
            </button>
          ))}
          </div>
          {/* Tab content */}
          <div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {activeTab === "profile"   && <ProfileTab user={user} updateProfile={updateProfile} logout={logout} navigate={navigate} />}
              {activeTab === "orders"    && <OrdersTab orders={orders} />}
              {activeTab === "addresses" && <AddressesTab addresses={addresses} removeAddress={removeAddress} addAddress={addAddress} />}
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
