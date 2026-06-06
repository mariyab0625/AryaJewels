import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight, Shield, Truck, RefreshCw, Award, Share2 } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/product/ProductCard";

// ─── Image gallery ────────────────────────────────────────────────────────────
function Gallery({ images, name }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Main image */}
      <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#F2EDE4", aspectRatio: "4/5" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={name}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </AnimatePresence>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button onClick={prev} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", background: "rgba(253,246,240,0.85)", border: "none", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronLeft size={16} color="#2E221E" />
            </button>
            <button onClick={next} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "rgba(253,246,240,0.85)", border: "none", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronRight size={16} color="#2E221E" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: "8px" }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: "72px", height: "72px", overflow: "hidden", border: "2px solid",
              borderColor: active === i ? "#CE7661" : "transparent",
              backgroundColor: "#F2EDE4", cursor: "pointer", padding: 0, flexShrink: 0,
              transition: "border-color 0.2s",
            }}>
              <img src={img} alt={`View ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Info panel ───────────────────────────────────────────────────────
function ProductInfo({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const promises = [
    { Icon: Shield,    text: "BIS Hallmark Certified" },
    { Icon: Truck,     text: "Free shipping above ₹999" },
    { Icon: RefreshCw, text: "30-day easy returns" },
    { Icon: Award,     text: "Master crafted artisans" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <Link to="/shop" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", textDecoration: "none", letterSpacing: "0.1em" }}>Shop</Link>
        <span style={{ color: "#8A8078", fontSize: "10px" }}>/</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", letterSpacing: "0.1em" }}>{product.category}</span>
        <span style={{ color: "#8A8078", fontSize: "10px" }}>/</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#2E221E", letterSpacing: "0.05em" }}>{product.name}</span>
      </div>

      {/* Tag */}
      {product.tag && (
        <span style={{ display: "inline-block", backgroundColor: "#CE7661", color: "white", fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", padding: "4px 12px", marginBottom: "16px", width: "fit-content" }}>
          {product.tag}
        </span>
      )}

      {/* Name */}
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#2E221E", lineHeight: 1.15, marginBottom: "8px" }}>
        {product.name}
      </h1>

      {/* Material */}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8A8078", marginBottom: "20px" }}>
        {product.material} · {product.category}
      </p>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 500, color: "#2E221E" }}>
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        {product.originalPrice && (
          <>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#8A8078", textDecoration: "line-through" }}>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#CE7661", fontWeight: 600 }}>
              {discount}% off
            </span>
          </>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "rgba(46,34,30,0.1)", marginBottom: "24px" }} />

      {/* Description */}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.85, color: "#6B5750", marginBottom: "32px" }}>
        {product.description}
      </p>

      {/* Qty + Actions */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
        {/* Qty stepper */}
        <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(46,34,30,0.2)", height: "48px" }}>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: "40px", height: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#2E221E" }}>−</button>
          <span style={{ width: "40px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#2E221E" }}>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} style={{ width: "40px", height: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#2E221E" }}>+</button>
        </div>

        {/* Add to bag */}
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1, minWidth: "180px", height: "48px",
            backgroundColor: added ? "#2E221E" : "#CE7661",
            color: "white", border: "none", cursor: "pointer",
            fontFamily: "Inter, sans-serif", fontSize: "10px",
            fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            transition: "background-color 0.3s ease",
          }}
        >
          <ShoppingBag size={14} />
          {added ? "Added to Bag ✓" : "Add to Bag"}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            width: "48px", height: "48px", border: "1px solid rgba(46,34,30,0.2)",
            backgroundColor: wishlisted ? "#fff0ee" : "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          <Heart size={16} color="#CE7661" fill={wishlisted ? "#CE7661" : "none"} style={{ transition: "fill 0.2s" }} />
        </button>
      </div>

      {/* View Cart link */}
      <Link to="/cart" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#CE7661", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "1px solid rgba(206,118,97,0.4)", paddingBottom: "1px", width: "fit-content", marginBottom: "32px" }}>
        View Cart →
      </Link>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "rgba(46,34,30,0.1)", marginBottom: "24px" }} />

      {/* Promises */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px" }}>
        {promises.map(({ Icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon size={14} color="#CE7661" />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B5750" }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Share */}
      <button style={{ display: "flex", alignItems: "center", gap: "7px", background: "none", border: "none", cursor: "pointer", color: "#8A8078", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", padding: 0, width: "fit-content" }}>
        <Share2 size={13} /> Share
      </button>
    </div>
  );
}

// ─── Related products ─────────────────────────────────────────────────────────
function RelatedProducts({ current }) {
  const related = products
    .filter((p) => p.id !== current.id && p.category === current.category)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section style={{ backgroundColor: "#F7F1EB", padding: "80px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "10px" }}>You May Also Like</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "#2E221E" }}>
            More from {current.category}
          </h2>
        </motion.div>
        <div className="related-grid">
          {related.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
  }, [id]);

  if (!product) {
    return (
      <main style={{ backgroundColor: "var(--color-bg-main)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 300, color: "#2E221E", marginBottom: "16px" }}>Product not found</h2>
          <Link to="/shop" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#CE7661", textDecoration: "none", borderBottom: "1px solid #CE7661" }}>
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--color-bg-main)" }}>
      {/* Back nav */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 48px 0" }}>
        <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8078" }}>
          <ArrowLeft size={13} /> Back
        </button>
      </div>

      {/* Main grid */}
      <div className="page-content-pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="product-detail-grid">
          <Gallery images={product.images || [product.image]} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related */}
      <RelatedProducts current={product} />
    </main>
  );
}
