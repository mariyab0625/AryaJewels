import { useState } from "react";
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

        {/* Wishlist — top-right, always visible */}
        <button
          onClick={() => toggleWishlist(product)}
          style={{
            position: "absolute", top: "6px", right: "6px",
            width: "28px", height: "28px",
            backgroundColor: "transparent",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Heart
            size={14}
            color={wishlisted ? "#CE7661" : "#FDF6F0"}
            fill={wishlisted ? "#CE7661" : "none"}
            style={{ transition: "fill 0.2s ease", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}
          />
        </button>

        {/* Badges — smaller, top-left */}
        <div style={{ position: "absolute", top: "6px", left: "6px", display: "flex", flexDirection: "column", gap: "3px" }}>
          {product.tag && (
            <span style={{
              backgroundColor: "#CE7661", color: "white",
              fontFamily: "Inter, sans-serif", fontSize: "7px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "3px 7px", lineHeight: 1,
            }}>
              {product.tag}
            </span>
          )}
          {discount && (
            <span style={{
              backgroundColor: "#2E221E", color: "white",
              fontFamily: "Inter, sans-serif", fontSize: "7px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "3px 7px", lineHeight: 1,
            }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Add to bag — slides up on hover */}
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
              color: "white", border: "none",
              padding: "10px",
              fontFamily: "Inter, sans-serif", fontSize: "8px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#CE7661")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2E221E")}
          >
            <ShoppingBag size={11} /> Add to Bag
          </button>
        </div>
      </div>

      {/* Info — tighter spacing */}
      <div style={{ paddingTop: "8px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8A8078", marginBottom: "3px" }}>
          {product.material}
        </p>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontWeight: 400, color: "#2E221E", lineHeight: 1.25 }}>
            {product.name}
          </h3>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "#2E221E" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", textDecoration: "line-through" }}>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
