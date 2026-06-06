import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, X, ArrowRight, Shield, Truck, RefreshCw, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function EmptyCart() {
  return (
    <div style={{ textAlign: "center", padding: "100px 24px" }}>
      <div style={{ width: "64px", height: "64px", border: "1px solid rgba(206,118,97,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <ShoppingBag size={24} color="#CE7661" />
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 300, color: "#2E221E", marginBottom: "12px" }}>
        Your bag is empty
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", lineHeight: 1.7, margin: "0 auto 32px", maxWidth: "300px" }}>
        Add pieces you love and they'll appear here.
      </p>
      <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#CE7661", color: "white", padding: "13px 28px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none" }}>
        Shop Now <ArrowRight size={11} />
      </Link>
    </div>
  );
}

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const shipping = cartTotal >= 999 ? 0 : 199;
  const grandTotal = cartTotal + shipping;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
  }, []);

  return (
    <main style={{ backgroundColor: "var(--color-bg-main)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#2E221E", padding: "48px 48px 36px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#EBC9BE", marginBottom: "8px" }}>ARYAjewels</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#FDF6F0" }}>
              Shopping Bag
            </h1>
            {cartItems.length > 0 && (
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(253,246,240,0.5)" }}>
                {cartItems.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="page-content-pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-layout">

            {/* ── Cart items ── */}
            <div>
              {/* Free shipping progress */}
              {cartTotal < 999 && (
                <div style={{ backgroundColor: "#F7F1EB", padding: "14px 20px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Truck size={14} color="#CE7661" />
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#2E221E" }}>
                    Add <strong>₹{(999 - cartTotal).toLocaleString("en-IN")}</strong> more for free shipping
                  </p>
                </div>
              )}
              {cartTotal >= 999 && (
                <div style={{ backgroundColor: "#F7F1EB", padding: "14px 20px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Truck size={14} color="#CE7661" />
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#2E221E" }}>
                    🎉 You've unlocked <strong>free shipping!</strong>
                  </p>
                </div>
              )}

              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "20px", paddingBottom: "28px", marginBottom: "28px", borderBottom: "1px solid rgba(46,34,30,0.08)" }}
                  >
                    {/* Thumb */}
                    <Link to={`/product/${item.id}`}>
                      <div style={{ height: "120px", overflow: "hidden", backgroundColor: "#F2EDE4" }}>
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                    </Link>

                    {/* Details */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8A8078", marginBottom: "4px" }}>{item.material}</p>
                          <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 400, color: "#2E221E", lineHeight: 1.3 }}>{item.name}</h3>
                          </Link>
                        </div>
                        {/* Remove */}
                        <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8078", padding: "2px", flexShrink: 0 }}>
                          <X size={14} />
                        </button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                        {/* Qty */}
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(46,34,30,0.18)", height: "36px" }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: "32px", height: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2E221E" }}><Minus size={11} /></button>
                          <span style={{ width: "32px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#2E221E" }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: "32px", height: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2E221E" }}><Plus size={11} /></button>
                        </div>

                        {/* Line total */}
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#2E221E" }}>
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Save for later */}
                      <button
                        onClick={() => { toggleWishlist(item); removeFromCart(item.id); }}
                        style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", color: isWishlisted(item.id) ? "#8A8078" : "#CE7661", letterSpacing: "0.1em", textTransform: "uppercase", padding: 0, textAlign: "left", width: "fit-content" }}
                      >
                        {isWishlisted(item.id) ? "Already in wishlist" : "Save for later"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Order summary ── */}
            <div style={{ position: "sticky", top: "80px", backgroundColor: "#F7F1EB", padding: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "#2E221E", marginBottom: "24px" }}>Order Summary</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B5750" }}>Subtotal</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#2E221E" }}>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B5750" }}>Shipping</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: shipping === 0 ? "#CE7661" : "#2E221E" }}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(46,34,30,0.12)", marginBottom: "20px" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "28px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: "#2E221E" }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 600, color: "#2E221E" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              {/* Checkout */}
              <button
                onClick={() => navigate("/checkout")}
                style={{ width: "100%", backgroundColor: "#CE7661", color: "white", border: "none", padding: "15px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", marginBottom: "12px", transition: "background 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#B9523C"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#CE7661"}
              >
                Proceed to Checkout
              </button>

              <Link to="/shop" style={{ display: "block", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Continue Shopping
              </Link>

              {/* Trust badges */}
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(46,34,30,0.1)", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { Icon: Shield, text: "BIS Hallmark Certified" },
                  { Icon: Truck,  text: "Free shipping above ₹999" },
                  { Icon: RefreshCw, text: "30-day easy returns" },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <Icon size={12} color="#CE7661" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B5750" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
