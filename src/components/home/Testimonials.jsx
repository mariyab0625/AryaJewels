import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { testimonials } from "../../data/testimonials";

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#CE7661">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

// Duplicate list so we always have enough cards on both sides
const CARDS = [...testimonials, ...testimonials, ...testimonials];
const BASE = testimonials.length; // 4

// position offsets relative to center: -2 -1 0 1 2
const POSITIONS = [-2, -1, 0, 1, 2];

const styleForPos = (pos) => {
  if (pos === 0)  return { scale: 1,    opacity: 1,    zIndex: 5, blur: 0 };
  if (Math.abs(pos) === 1) return { scale: 0.88,  opacity: 0.75,  zIndex: 3, blur: 0 };
  return              { scale: 0.76,  opacity: 0.45,  zIndex: 1, blur: 2 };
};

// Translate each position to a % of container width
const xForPos = (pos) => `calc(${pos * 105}%)`;

export default function Testimonials() {
  const [center, setCenter] = useState(0); // index in original testimonials array

  useEffect(() => {
    const timer = setInterval(() => {
      setCenter((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Build the 5 visible cards
  const visible = POSITIONS.map((offset) => {
    const idx = (center + offset + testimonials.length) % testimonials.length;
    return { ...testimonials[idx], offset };
  });

  return (
    <section style={{ backgroundColor: "var(--color-bg-main)", padding: "100px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>
            Real Stories
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2E221E" }}>
            What Our Customers Say
          </h2>
        </motion.div>

        {/* Rotating card strip */}
        <div style={{ position: "relative", height: "320px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {visible.map((card) => {
            const s = styleForPos(card.offset);
            return (
              <motion.div
                key={card.id + "-" + card.offset}
                animate={{
                  x: xForPos(card.offset),
                  scale: s.scale,
                  opacity: s.opacity,
                  zIndex: s.zIndex,
                  filter: s.blur > 0 ? `blur(${s.blur}px)` : "none",
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  if (card.offset !== 0) {
                    setCenter((center + card.offset + testimonials.length) % testimonials.length);
                  }
                }}
                style={{
                  position: "absolute",
                  width: "260px",
                  cursor: card.offset !== 0 ? "pointer" : "default",
                  transformOrigin: "center center",
                  backgroundColor: card.offset === 0 ? "#FDF6F0" : "#fce3daff",
                  border: card.offset === 0 ? "1px solid rgba(206,118,97,0.3)" : "1px solid rgba(206,118,97,0.1)",
                  padding: card.offset === 0 ? "32px 28px" : "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: card.offset === 0 ? "14px" : "10px",
                  boxShadow: card.offset === 0 ? "0 12px 40px rgba(46,34,30,0.1)" : "none",
                  transition: "background-color 0.4s, border 0.4s",
                  userSelect: "none",
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: "3px" }}>
                  {Array(card.rating).fill(0).map((_, j) => <StarIcon key={j} />)}
                </div>

                {/* Quote */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: card.offset === 0 ? "15px" : "13px",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "#4A4A4A",
                  lineHeight: 1.7,
                  display: "-webkit-box",
                  WebkitLineClamp: card.offset === 0 ? 4 : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  "{card.text}"
                </p>

                {/* Product */}
                {card.offset === 0 && (
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#CE7661" }}>
                    {card.product}
                  </p>
                )}

                {/* Author */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  paddingTop: card.offset === 0 ? "12px" : "8px",
                  borderTop: "1px solid #E8DFD0",
                }}>
                  <img
                    src={card.avatar}
                    alt={card.name}
                    style={{
                      width: card.offset === 0 ? "36px" : "28px",
                      height: card.offset === 0 ? "36px" : "28px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: card.offset === 0 ? "2px solid #EBC9BE" : "none",
                    }}
                  />
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: card.offset === 0 ? "12px" : "10px", fontWeight: 500, color: "#2E221E" }}>
                      {card.name}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#8A8078" }}>
                      {card.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "7px", marginTop: "40px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenter(i)}
              style={{
                width: i === center ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: i === center ? "#CE7661" : "#D9CFC7",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
