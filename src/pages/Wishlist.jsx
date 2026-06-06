import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function EmptyWishlist() {
  return (
    <div style={{ textAlign: "center", padding: "100px 24px" }}>
      <div style={{ width: "64px", height: "64px", border: "1px solid rgba(206,118,97,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <Heart size={24} color="#CE7661" fill="none" />
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 300, color: "#2E221E", marginBottom: "12px" }}>
        Your wishlist is empty
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", lineHeight: 1.7, marginBottom: "32px", maxWidth: "320px", margin: "0 auto 32px" }}>
        Save pieces you love and come back to them anytime.
      </p>
      <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#CE7661", color: "white", padding: "13px 28px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none" }}>
        Explore Jewellery <ArrowRight size={11} />
      </Link>
    </div>
  );
}

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
  }, []);

  return (
    <main style={{ backgroundColor: "var(--color-bg-main)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#2E221E", padding: "48px 48px 36px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#EBC9BE", marginBottom: "8px" }}>ARYAjewels</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#FDF6F0" }}>
              My Wishlist
            </h1>
            {wishlist.length > 0 && (
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(253,246,240,0.5)" }}>
                {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="page-content-pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            <motion.div layout className="wishlist-grid">
              <AnimatePresence mode="popLayout">
                {wishlist.map((product) => {
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : null;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: "relative" }}
                    >
                      {/* Remove */}
                      <button
                        onClick={() => toggleWishlist(product)}
                        style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2, background: "rgba(253,246,240,0.9)", border: "none", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                        title="Remove from wishlist"
                      >
                        <X size={12} color="#2E221E" />
                      </button>

                      {/* Image */}
                      <Link to={`/product/${product.id}`} style={{ display: "block", textDecoration: "none" }}>
                        <div style={{ position: "relative", paddingBottom: "125%", overflow: "hidden", backgroundColor: "#F2EDE4", marginBottom: "14px" }}>
                          <img src={product.image} alt={product.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                          />
                          {product.tag && (
                            <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#CE7661", color: "white", fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 10px" }}>
                              {product.tag}
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Info */}
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8A8078", marginBottom: "5px" }}>{product.material}</p>
                      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 400, color: "#2E221E", lineHeight: 1.3, marginBottom: "8px" }}>{product.name}</h3>
                      </Link>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#2E221E" }}>₹{product.price.toLocaleString("en-IN")}</span>
                        {product.originalPrice && (
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078", textDecoration: "line-through" }}>₹{product.originalPrice.toLocaleString("en-IN")}</span>
                        )}
                        {discount && <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#CE7661" }}>-{discount}%</span>}
                      </div>

                      {/* Move to bag */}
                      <button
                        onClick={() => { addToCart(product); toggleWishlist(product); }}
                        style={{ width: "100%", backgroundColor: "#2E221E", color: "white", border: "none", padding: "11px", fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#CE7661"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2E221E"}
                      >
                        <ShoppingBag size={12} /> Move to Bag
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Continue shopping */}
            <div style={{ marginTop: "56px", textAlign: "center" }}>
              <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2E221E", textDecoration: "none", borderBottom: "1px solid rgba(46,34,30,0.3)", paddingBottom: "2px" }}>
                Continue Shopping <ArrowRight size={11} />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
