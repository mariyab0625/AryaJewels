import { motion } from "framer-motion";

const imgs = [
  "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&q=80",
  "https://images.unsplash.com/photo-1573408301185-9519f94815b6?w=500&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
];

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" width="22" height="22">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="white" stroke="none" />
  </svg>
);

export default function InstagramGallery() {
  return (
    <section style={{ backgroundColor: "#f7e7e1ff", padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px" }}>
            <IgIcon />
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B76E79" }}>
              @aryacollections
            </p>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2C2C2C" }}>
            Life in Jewellery
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", marginTop: "10px" }}>
            Tag us with <span style={{ color: "#B76E79" }}>#AryaCollections</span> to be featured
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
          {imgs.map((src, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ display: "block", position: "relative", paddingBottom: "100%", overflow: "hidden" }}
            >
              <img
                src={src}
                alt=""
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.nextSibling.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.nextSibling.style.opacity = "0";
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                backgroundColor: "rgba(183,110,121,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0, transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}>
                <IgIcon />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
