import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, Award } from "lucide-react";

const items = [
  { icon: Shield, title: "Hallmark Certified", desc: "BIS hallmarked gold & silver" },
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
  { icon: RefreshCw, title: "30-Day Returns", desc: "Hassle-free easy returns" },
  { icon: Award, title: "Master Crafted", desc: "By artisans with 20+ years" },
];

export default function BrandPromise() {
  return (
    <section style={{ backgroundColor: "#2E221E", padding: "40px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }} className="brand-promise-container">
        <div className="brand-promise-grid">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="brand-promise-item"
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: "1px solid rgba(206,118,97,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
                className="brand-promise-icon"
              >
                <item.icon size={18} color="#CE7661" />
              </div>
              <div className="brand-promise-text">
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", color: "#FDF6F0", textTransform: "uppercase" }}>
                  {item.title}
                </p>
                <p className="brand-promise-desc" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078", marginTop: "3px" }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .brand-promise-item {
          display: flex; align-items: center; gap: 16px;
        }
        @media (max-width: 768px) {
          .brand-promise-container { padding: 0 12px !important; }
          .brand-promise-grid { 
            display: flex !important; 
            flex-direction: row !important;
            justify-content: space-between;
          }
          .brand-promise-item {
            flex-direction: column;
            align-items: center;
            gap: 8px;
            text-align: center;
            flex: 1;
          }
          .brand-promise-icon {
            width: 36px !important;
            height: 36px !important;
          }
          .brand-promise-text p:first-child {
            font-size: 8px !important;
            letter-spacing: 0.04em !important;
          }
          .brand-promise-desc { display: none !important; }
        }
      `}</style>
    </section>
  );
}
