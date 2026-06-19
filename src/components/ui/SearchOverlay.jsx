import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              backgroundColor: "rgba(46,34,30,0.5)",
              zIndex: 150,
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "54px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(600px, 92vw)",
              backgroundColor: "#FDF6F0",
              zIndex: 160,
              boxShadow: "0 16px 48px rgba(46,34,30,0.2)",
            }}
          >
            {/* Input row */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "16px 20px",
              borderBottom: results.length > 0 ? "1px solid rgba(46,34,30,0.1)" : "none",
            }}>
              <Search size={16} color="#CE7661" style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search rings, necklaces, gold…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: 1, border: "none", outline: "none",
                  fontFamily: "Inter, sans-serif", fontSize: "14px",
                  color: "#2E221E", backgroundColor: "transparent",
                }}
              />
              <button
                onClick={onClose}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8078", display: "flex" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "12px 20px", textDecoration: "none",
                      borderBottom: "1px solid rgba(46,34,30,0.06)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F7F1EB"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "44px", height: "50px", objectFit: "cover", backgroundColor: "#F2EDE4", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: 400, color: "#2E221E" }}>
                        {product.name}
                      </p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", letterSpacing: "0.1em", marginTop: "2px" }}>
                        {product.material} · {product.category}
                      </p>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#2E221E", flexShrink: 0 }}>
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </Link>
                ))}

                {/* View all results */}
                <Link
                  to={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  style={{
                    display: "block", textAlign: "center", padding: "14px",
                    fontFamily: "Inter, sans-serif", fontSize: "10px",
                    fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#CE7661", textDecoration: "none",
                    borderTop: "1px solid rgba(46,34,30,0.08)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F7F1EB"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  View all results for "{query}"
                </Link>
              </div>
            )}

            {/* No results */}
            {query.trim().length > 1 && results.length === 0 && (
              <div style={{ padding: "24px 20px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#2E221E", marginBottom: "6px" }}>
                  No results for "{query}"
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078" }}>
                  Try a different search term
                </p>
              </div>
            )}

            {/* Hint when empty */}
            {query.trim().length <= 1 && (
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A8078", marginBottom: "10px" }}>
                  Popular
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["Rings", "Necklaces", "Gold", "Bridal", "Earrings"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: "11px",
                        letterSpacing: "0.1em", padding: "6px 14px",
                        border: "1px solid rgba(46,34,30,0.15)",
                        backgroundColor: "transparent", cursor: "pointer",
                        color: "#2E221E", transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#CE7661"; e.currentTarget.style.color = "#CE7661"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(46,34,30,0.15)"; e.currentTarget.style.color = "#2E221E"; }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
