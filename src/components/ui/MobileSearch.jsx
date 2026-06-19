import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/products";

const popularTags = ["Rings", "Necklaces", "Gold", "Bridal", "Earrings", "Bracelets", "Diamond", "Silver"];

export default function MobileSearch({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const results = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.material && p.material.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : [];

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ type: "tween", duration: 0.25 }}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            backgroundColor: "#FDF6F0",
            display: "flex", flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Top bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "14px 16px", borderBottom: "1px solid rgba(46,34,30,0.1)",
            backgroundColor: "#FDF6F0", position: "sticky", top: 0, zIndex: 1,
          }}>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#2E221E", display: "flex", padding: "4px", flexShrink: 0 }}>
              <ArrowLeft size={22} />
            </button>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#F2EDE4", padding: "10px 14px" }}>
              <Search size={15} color="#8A8078" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search jewellery…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: 1, border: "none", background: "transparent",
                  fontFamily: "Inter, sans-serif", fontSize: "14px",
                  color: "#2E221E", outline: "none",
                }}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8078", display: "flex", padding: 0 }}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div style={{ flex: 1, padding: "20px 16px" }}>
            {/* Popular tags — shown when no query */}
            {!query && (
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#8A8078", marginBottom: "14px" }}>
                  Popular
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: "12px",
                        letterSpacing: "0.05em", padding: "8px 16px",
                        border: "1px solid rgba(46,34,30,0.15)",
                        backgroundColor: "transparent", cursor: "pointer",
                        color: "#2E221E", borderRadius: "2px",
                        transition: "all 0.2s",
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {query.trim().length > 1 && (
              <div>
                {results.length > 0 ? (
                  <>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#8A8078", marginBottom: "14px" }}>
                      {results.length} result{results.length !== 1 ? "s" : ""}
                    </p>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        style={{
                          display: "flex", alignItems: "center", gap: "14px",
                          padding: "14px 0", textDecoration: "none",
                          borderBottom: "1px solid rgba(46,34,30,0.06)",
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "48px", height: "56px", objectFit: "cover", backgroundColor: "#F2EDE4", flexShrink: 0 }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#2E221E", marginBottom: "3px" }}>
                            {product.name}
                          </p>
                          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", letterSpacing: "0.08em" }}>
                            {product.material} · {product.category}
                          </p>
                        </div>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#2E221E", flexShrink: 0 }}>
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      </Link>
                    ))}
                    <Link
                      to="/shop"
                      onClick={onClose}
                      style={{
                        display: "block", textAlign: "center", padding: "16px",
                        fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "#CE7661", textDecoration: "none", marginTop: "8px",
                      }}
                    >
                      View all results →
                    </Link>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "48px 0" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#2E221E", marginBottom: "8px" }}>No results</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078" }}>Try a different search term</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
