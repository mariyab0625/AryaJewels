import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: 1,
    name: "Bridal",
    caption: "Crafted for your most cherished moments",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=85",
    big: true,
  },
  {
    id: 2,
    name: "Dailywear",
    caption: "Light, wearable, effortlessly you",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    big: true,
  },
  {
    id: 3,
    name: "Gold",
    caption: "Timeless warmth",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85",
    big: false,
  },
  {
    id: 4,
    name: "Silver",
    caption: "Cool, refined elegance",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    big: false,
  },
  {
    id: 5,
    name: "Diamond",
    caption: "Brilliance in every facet",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85",
    big: false,
  },
];

function CollectionCard({ item, i, heightClass }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: i * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={heightClass}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
    >
      <Link to="/shop" style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.8s ease",
          }}
        />

        {/* Base gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(46,34,30,0.75) 0%, rgba(46,34,30,0.08) 55%, transparent 100%)",
        }} />

        {/* Hover deep overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,15,12,0.82) 0%, rgba(44,34,28,0.45) 60%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }} />

        {/* Text */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: item.big ? "20px 24px" : "14px 16px",
        }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: item.big ? "28px" : "20px",
            fontWeight: 400,
            color: "#FDF6F0",
            margin: 0,
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}>
            {item.name}
          </h3>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            color: "rgba(253,246,240,0.7)",
            letterSpacing: "0.08em",
            marginTop: "5px",
            opacity: hovered ? 1 : 0.6,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "all 0.35s ease",
          }}>
            {item.caption}
          </p>

          {/* CTA — only on hover */}
          <div style={{
            marginTop: "12px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.35s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "Inter, sans-serif",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#FDF6F0",
            borderBottom: "1px solid rgba(253,246,240,0.5)",
            paddingBottom: "2px",
          }}>
            Shop Now <ArrowRight size={9} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Collections() {
  const big   = collections.filter((c) => c.big);
  const small = collections.filter((c) => !c.big);

  return (
    <section style={{ backgroundColor: "#f7e7e1ff", padding: "56px 0 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "28px" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>
            Discover
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2C2C2C" }}>
            Our Collections
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", marginTop: "14px", lineHeight: 1.7 }}>
            A companion for every occasion
          </p>
        </motion.div>

        {/* Row 1 — two big cards side by side */}
        <div className="coll-big-grid">
          {big.map((item, i) => (
            <CollectionCard key={item.id} item={item} i={i} heightClass="coll-big" />
          ))}
        </div>

        {/* Row 2 — three small cards */}
        <div className="coll-small-grid">
          {small.map((item, i) => (
            <CollectionCard key={item.id} item={item} i={i + 2} heightClass="coll-small" />
          ))}
        </div>
      </div>

      <style>{`
        .coll-big  { height: 300px; }
        .coll-small { height: 190px; }
        @media (max-width: 768px) {
          .coll-big  { height: 220px; }
          .coll-small { height: 150px; }
        }
      `}</style>
    </section>
  );
}
