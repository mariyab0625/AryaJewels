import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      {/* Image */}
      <div style={{ position: "relative", paddingBottom: "125%", overflow: "hidden", backgroundColor: "#F2EDE4" }}>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              display: "block",
            }}
          />
        </Link>

        {/* Badges */}
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {product.tag && (
            <span style={{
              backgroundColor: "#CE7661", color: "white",
              fontFamily: "Inter, sans-serif", fontSize: "8px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "4px 10px",
            }}>
              {product.tag}
            </span>
          )}
          {discount && (
            <span style={{
              backgroundColor: "#2E221E", color: "white",
              fontFamily: "Inter, sans-serif", fontSize: "8px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "4px 10px",
            }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist — always visible, no background */}
        <button
          onClick={() => toggleWishlist(product)}
          style={{
            position: "absolute", top: "12px", right: "12px",
            width: "34px", height: "34px",
            backgroundColor: "transparent",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Heart
            size={16}
            color={wishlisted ? "#CE7661" : "#FDF6F0"}
            fill={wishlisted ? "#CE7661" : "none"}
            style={{ transition: "fill 0.2s ease, color 0.2s ease", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
          />
        </button>

        {/* Add to bag — slides up */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s ease",
        }}>
          <button
            onClick={() => addToCart(product)}
            style={{
              width: "100%",
              backgroundColor: "#2E221E",
              color: "white",
              border: "none",
              padding: "12px",
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#CE7661")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2E221E")}
          >
            <ShoppingBag size={12} /> Add to Bag
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ paddingTop: "14px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8A8078", marginBottom: "5px" }}>
          {product.material}
        </p>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 400, color: "#2E221E", lineHeight: 1.3 }}>
            {product.name}
          </h3>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#2E221E" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078", textDecoration: "line-through" }}>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
