import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredProducts } from "../../data/products";
import ProductCard from "../product/ProductCard";

export default function FeaturedProducts() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-main)", padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "10px" }}>
              Handpicked For You
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2E221E" }}>
              Featured Pieces
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Link
              to="/shop"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "Inter, sans-serif", fontSize: "10px",
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#2E221E", textDecoration: "none",
                borderBottom: "1px solid #2E221E", paddingBottom: "2px",
              }}
            >
              View All <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="product-grid-4">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
