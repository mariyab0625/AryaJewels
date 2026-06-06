import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";

const Sparkle = ({ size = 20, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", ...style }}>
    <path
      d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
      fill="var(--color-accent-rust)"
    />
  </svg>
);

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const categoryCards = [
  {
    name: "Rings",
    caption: "From solitaires to stacking bands",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85",
    slug: "rings",
  },
  {
    name: "Necklaces",
    caption: "Delicate chains to statement pieces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&q=85",
    slug: "necklaces",
  },
  {
    name: "Bracelets",
    caption: "Bangles, cuffs & layered charm",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=85",
    slug: "bracelets",
  },
  {
    name: "Earrings",
    caption: "Studs, hoops & cascading drops",
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=700&q=85",
    slug: "earrings",
  },
];

function CategoryCard({ cat, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
      className={`cat-hero-card cat-hero-card-${delay > 0.6 ? "tall" : "short"}`}
    >
      {/* Image */}
      <img
        src={cat.image}
        alt={cat.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.8s ease",
        }}
      />

      {/* Always-on bottom gradient for title */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(46,34,30,0.72) 0%, rgba(46,34,30,0.1) 45%, transparent 100%)",
        transition: "opacity 0.4s ease",
      }} />

      {/* Hover deep overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(20,15,12,0.82) 0%, rgba(44,34,28,0.45) 60%, transparent 100%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Bottom content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "22px",
          fontWeight: 500,
          fontStyle: "italic",
          color: "#FDF6F0",
          letterSpacing: "0.04em",
          margin: 0,
        }}>
          {cat.name}
        </h3>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          color: "rgba(253,246,240,0.7)",
          letterSpacing: "0.1em",
          margin: 0,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          opacity: hovered ? 1 : 0.7,
          transition: "all 0.3s ease",
        }}>
          {cat.caption}
        </p>

        {/* Hover CTA buttons */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginTop: "10px",
          transform: hovered ? "translateY(0)" : "translateY(12px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.35s ease",
        }}>
          <Link
            to="/shop"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#2E221E",
              backgroundColor: "#FDF6F0",
              padding: "7px 14px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              whiteSpace: "nowrap",
            }}
          >
            Shop Now <ArrowRight size={9} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 54px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 40px 64px 40px",
        overflow: "hidden",
        backgroundColor: "var(--color-bg-main)",
      }}
    >
      {/* Decorative dots */}
      <div style={{ position: "absolute", left: "24px", top: "40%", display: "flex", flexDirection: "column", gap: "6px", zIndex: 10 }}>
        <span style={{ width: "3.5px", height: "3.5px", borderRadius: "50%", backgroundColor: "var(--color-accent-rust)", opacity: 0.8 }} />
        <span style={{ width: "3.5px", height: "3.5px", borderRadius: "50%", backgroundColor: "var(--color-accent-rust)", opacity: 0.6 }} />
        <span style={{ width: "3.5px", height: "3.5px", borderRadius: "50%", backgroundColor: "var(--color-accent-rust)", opacity: 0.4 }} />
      </div>

      <Sparkle size={24} style={{ position: "absolute", left: "120px", top: "42%", opacity: 0.8, zIndex: 10 }} />
      <Sparkle size={28} style={{ position: "absolute", right: "140px", top: "14%", opacity: 0.8, zIndex: 10 }} />

      {/* Vertical Socials */}
      <div className="hidden-mobile" style={{ position: "absolute", right: "20px", top: "30%", transform: "rotate(90deg) translateY(-50%)", transformOrigin: "right center", fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.25em", color: "var(--color-text-light)", zIndex: 10 }}>INSTAGRAM</div>
      <div className="hidden-mobile" style={{ position: "absolute", right: "20px", top: "60%", transform: "rotate(90deg) translateY(-50%)", transformOrigin: "right center", fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.25em", color: "var(--color-text-light)", zIndex: 10 }}>FACEBOOK</div>

      {/* Top Text Block */}
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px", marginBottom: "48px" }}>
        <div style={{ flex: "1 1 550px" }}>
          <motion.div {...fade(0.1)} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ width: "16px", height: "1px", backgroundColor: "var(--color-accent-rust)" }} />
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em", color: "var(--color-accent-rust)", textTransform: "uppercase" }}>Jewellery</p>
          </motion.div>
          <motion.h1 {...fade(0.2)} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(34px, 4.8vw, 56px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "0.02em", color: "var(--color-text-dark)" }}>
            ALL THE{" "}
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 600 }} className="text-rust">BEAUTY</span>{" "}
            IS <br />
            IN{" "}
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 600, textTransform: "lowercase" }} className="text-rust">your</span>{" "}
            HANDS
          </motion.h1>
        </div>

        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", marginTop: "12px" }}>
          <motion.p {...fade(0.3)} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: "1.7", color: "var(--color-text-light)", maxWidth: "340px" }}>
            Handcrafted to bring unmatched luxury and timeless sparkle to your most precious moments.
          </motion.p>
          <motion.div {...fade(0.4)}>
            <Link
              to="/shop"
              style={{ display: "inline-flex", backgroundColor: "var(--color-accent-rust)", color: "white", padding: "14px 28px", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease", boxShadow: "0 4px 15px rgba(206, 118, 97, 0.15)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#B9523C"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent-rust)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div style={{ position: "relative", marginTop: "auto" }}>
        <div className="hero-cat-grid">
          {categoryCards.map((cat, i) => (
            <CategoryCard key={cat.slug} cat={cat} delay={0.5 + i * 0.1} />
          ))}
        </div>

        {/* Circular stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ position: "absolute", bottom: "-32px", right: "0px", width: "90px", height: "90px", zIndex: 20, cursor: "pointer" }}
          className="scroll-stamp"
        >
          <svg viewBox="0 0 100 100" width="90" height="90" className="animate-spin-slow">
            <path id="circlePath2" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
            <text fill="var(--color-text-light)" fontSize="7" fontWeight="500" letterSpacing="2.8">
              <textPath href="#circlePath2">SCROLL DOWN TO EXPLORE · SCROLL DOWN TO EXPLORE ·</textPath>
            </text>
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "var(--color-accent-rust)", display: "flex" }}>
            <ArrowDown size={14} />
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-cat-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 340px;
        }
        .hero-cat-grid > div:nth-child(2) {
          grid-row: span 1;
          height: 380px;
          align-self: end;
        }
        @media (max-width: 768px) {
          .hero-cat-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .hero-cat-grid > div {
            height: 240px !important;
          }
          .scroll-stamp { display: none !important; }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
