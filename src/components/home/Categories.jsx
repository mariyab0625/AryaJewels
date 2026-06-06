import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "../../data/categories";

function CatCard({ cat, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: i * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
    >
      <Link to="/shop" style={{ textDecoration: "none", display: "block" }}>
        {/* Image container */}
        <div style={{ position: "relative", paddingBottom: "133%", overflow: "hidden", backgroundColor: "#F2EDE4" }}>
          <img
            src={cat.image}
            alt={cat.name}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.7s ease",
            }}
          />
          {/* Base gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(46,34,30,0.6) 0%, transparent 55%)",
          }} />
          {/* Hover deep overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(20,15,12,0.82) 0%, rgba(44,34,28,0.45) 60%, transparent 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }} />
          {/* Hover button */}
          <div style={{
            position: "absolute", bottom: "16px", left: 0, right: 0,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.35s ease",
          }}>
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#2E221E", backgroundColor: "#FDF6F0",
              padding: "7px 18px",
              display: "inline-flex", alignItems: "center", gap: "5px",
            }}>
              Shop Now <ArrowRight size={9} />
            </span>
          </div>
        </div>

        {/* Label below */}
        <div style={{ paddingTop: "12px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: 400, color: "#2E221E" }}>
            {cat.name}
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8A8078", marginTop: "4px" }}>
            {cat.count} pieces
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-main)", padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>
            Browse By
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2E221E" }}>
            Shop by Category
          </h2>
        </motion.div>

        {/* 6-col grid */}
        <div className="cat-grid-6">
          {categories.map((cat, i) => (
            <CatCard key={cat.id} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
