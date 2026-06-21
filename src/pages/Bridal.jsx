import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, RefreshCw, Gem } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function BridalHero() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-main)", padding: "64px 48px 56px" }} className="bridal-hero-simple">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "56px", alignItems: "center" }} className="bridal-hero-inner">

          {/* Left — stacked polaroid-style images */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", height: "380px" }}
          >
            <div style={{
              position: "absolute", top: "16px", left: "10px", width: "200px", height: "240px",
              border: "8px solid white", overflow: "hidden",
              transform: "rotate(-5deg)", boxShadow: "0 8px 28px rgba(46,34,30,0.12)",
            }}>
              <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=85"
                alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{
              position: "absolute", top: "52px", left: "60px", width: "200px",
              border: "8px solid white", overflow: "visible",
              transform: "rotate(3deg)", boxShadow: "0 12px 36px rgba(46,34,30,0.16)",
              backgroundColor: "white",
            }}>
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=85"
                alt="" style={{ width: "100%", height: "230px", objectFit: "cover", display: "block" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontStyle: "italic", color: "#6B5750", textAlign: "center", padding: "8px 0 4px" }}>
                Bridal Collection
              </p>
            </div>
          </motion.div>

          {/* Right — editorial display text */}
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.45em", textTransform: "uppercase", color: "#CE7661", marginBottom: "14px" }}>
              ARYAjewels · Bridal Edit 2025
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
              style={{ margin: "0 0 6px", lineHeight: 1.0 }}>
              <span style={{ display: "block", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase", color: "#2E221E" }}>BRIDAL</span>
              <span style={{ display: "block", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 5.5vw, 68px)", fontStyle: "italic", fontWeight: 300, color: "#CE7661", letterSpacing: "0.06em" }}>Collection</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8078", marginTop: "14px", marginBottom: "28px" }}>
              Handcrafted for your forever moment
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#CE7661", color: "white", padding: "13px 28px", fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#B9523C"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#CE7661"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Shop Bridal <ArrowRight size={10} />
              </Link>
              <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(46,34,30,0.22)", color: "#2E221E", padding: "13px 28px", fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#CE7661"; e.currentTarget.style.color = "#CE7661"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(46,34,30,0.22)"; e.currentTarget.style.color = "#2E221E"; }}>
                Book Consultation
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.7 }}
              style={{ display: "flex", gap: "8px", marginTop: "24px", flexWrap: "wrap" }}>
              {["22K Gold", "BIS Certified", "Handcrafted", "Custom Sets"].map((tag) => (
                <span key={tag} style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#CE7661", border: "1px solid rgba(206,118,97,0.3)", padding: "4px 10px" }}>{tag}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bridal-hero-simple { padding: 40px 20px 36px !important; }
          .bridal-hero-inner { grid-template-columns: 1fr !important; gap: 28px !important; }
          .bridal-hero-inner > div:first-child { height: 260px !important; }
        }
      `}</style>
    </section>
  );
}
// ─── PROMISE STRIP ────────────────────────────────────────────────────────────
function BridalPromise() {
  const items = [
    { Icon: Shield, title: "Hallmark Certified", desc: "BIS 22K & 18K gold, certified purity" },
    { Icon: Gem, title: "Custom Bridal Sets", desc: "Personalised to your vision" },
    { Icon: Award, title: "Master Crafted", desc: "By artisans with 20+ years" },
    { Icon: RefreshCw, title: "Lifetime Care", desc: "Free cleaning & polishing forever" },
  ];
  return (
    <section style={{ backgroundColor: "#2E221E", padding: "40px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <div className="brand-promise-grid">
          {items.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid rgba(206,118,97,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <item.Icon size={18} color="#CE7661" />
              </div>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", color: "#FDF6F0", textTransform: "uppercase" }}>{item.title}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078", marginTop: "3px" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED BRIDAL PRODUCTS ─────────────────────────────────────────────────
function BridalProducts() {
  const bridalItems = products.filter((p) => p.isBridal);
  return (
    <section style={{ backgroundColor: "var(--color-bg-main)", padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "56px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>The Edit</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2E221E" }}>Bridal Favourites</h2>
          </div>
          <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#2E221E", textDecoration: "none", borderBottom: "1px solid #2E221E", paddingBottom: "2px" }}>
            View All <ArrowRight size={11} />
          </Link>
        </motion.div>
        <div className="product-grid-4">
          {bridalItems.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── THE BRIDAL JOURNEY — timeline ───────────────────────────────────────────
const journeySteps = [
  {
    num: "01",
    occasion: "Engagement",
    label: "The First Promise",
    body: "A solitaire that says everything. Choose from our collection of diamond rings, sapphire halos, and rose gold bands crafted to mark the beginning.",
    pieces: ["Solitaire Ring", "Diamond Halo Ring", "Stackable Bands"],
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=85",
    accent: "#CE7661",
  },
  {
    num: "02",
    occasion: "Mehendi",
    label: "Colour & Joy",
    body: "Light, playful pieces that complement the henna. Delicate bangles, pearl drops, and floral rings that celebrate the festivity without overpowering.",
    pieces: ["Pearl Drop Earrings", "Floral Bangles", "Charm Anklets"],
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=700&q=85",
    accent: "#B76E79",
  },
  {
    num: "03",
    occasion: "Wedding Ceremony",
    label: "The Grand Day",
    body: "This is your moment. Statement necklaces, layered sets, and heirloom-grade pieces in 22K gold that are as luminous as you are.",
    pieces: ["Bridal Choker Set", "Gold Necklace", "Statement Earrings"],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&q=85",
    accent: "#CE7661",
  },
  {
    num: "04",
    occasion: "Reception",
    label: "The Evening After",
    body: "Lighter and more contemporary. Diamond studs, sleek gold chains, and modern cuffs that carry the same elegance into your celebration night.",
    pieces: ["Diamond Studs", "Layered Chain", "Gold Cuff"],
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=85",
    accent: "#B76E79",
  },
];

function BridalJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveringImage, setHoveringImage] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const resumeTimer = useRef(null);

  // Auto-advance — paused while hovering image OR within 6s of a manual click
  useEffect(() => {
    if (hoveringImage || userSelected) return;
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % journeySteps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [hoveringImage, userSelected]);

  const handleStepClick = (i) => {
    setActiveStep(i);
    setUserSelected(true);
    // Clear any existing resume timeout
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    // Resume auto-advance after 6 seconds of inactivity
    resumeTimer.current = setTimeout(() => setUserSelected(false), 6000);
  };

  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  return (
    <section style={{ backgroundColor: "#F7F1EB", padding: "100px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>
            The Journey
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2E221E" }}>
            Jewellery for Every Moment
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", marginTop: "14px", lineHeight: 1.7 }}>
            From the first promise to the last dance — we have a piece for every step of your bridal story.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="journey-grid">

          {/* Left column — steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                onClick={() => handleStepClick(i)}
                style={{
                  padding: "36px 40px 36px 0",
                  borderBottom: i < journeySteps.length - 1 ? "1px solid rgba(46,34,30,0.1)" : "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: activeStep === i ? 1 : 0.5,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                  {/* Step number */}
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "13px", fontWeight: 400,
                    color: activeStep === i ? step.accent : "#8A8078",
                    letterSpacing: "0.1em",
                    marginTop: "4px", flexShrink: 0,
                    transition: "color 0.3s ease",
                  }}>
                    {step.num}
                  </span>
                  <div>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "9px",
                      letterSpacing: "0.3em", textTransform: "uppercase",
                      color: activeStep === i ? step.accent : "#8A8078",
                      marginBottom: "6px", transition: "color 0.3s ease",
                    }}>
                      {step.occasion}
                    </p>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(22px, 2.5vw, 30px)",
                      fontWeight: 400, fontStyle: "italic",
                      color: "#2E221E", lineHeight: 1.2, marginBottom: "12px",
                    }}>
                      {step.label}
                    </h3>
                    {/* Only show body + pieces when active */}
                    <motion.div
                      initial={false}
                      animate={{ height: activeStep === i ? "auto" : 0, opacity: activeStep === i ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", lineHeight: 1.85, color: "#6B5750", marginBottom: "20px" }}>
                        {step.body}
                      </p>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                        {step.pieces.map((piece) => (
                          <span key={piece} style={{
                            fontFamily: "Inter, sans-serif", fontSize: "8px", fontWeight: 500,
                            letterSpacing: "0.18em", textTransform: "uppercase",
                            color: step.accent, border: `1px solid ${step.accent}33`,
                            padding: "5px 12px",
                          }}>
                            {piece}
                          </span>
                        ))}
                      </div>
                      <Link to="/shop" style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600,
                        letterSpacing: "0.22em", textTransform: "uppercase",
                        color: "#2E221E", textDecoration: "none",
                        borderBottom: "1px solid rgba(46,34,30,0.35)", paddingBottom: "2px",
                      }}>
                        Shop {step.occasion} <ArrowRight size={9} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center — vertical line with dots */}
          <div className="journey-center-line" style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            {/* Line */}
            <div style={{ position: "absolute", top: 0, bottom: 0, width: "1px", backgroundColor: "rgba(206,118,97,0.2)", left: "50%" }} />
            {journeySteps.map((step, i) => (
              <div
                key={i}
                onClick={() => handleStepClick(i)}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", position: "relative", zIndex: 1,
                }}
              >
                <div style={{
                  width: activeStep === i ? "14px" : "8px",
                  height: activeStep === i ? "14px" : "8px",
                  borderRadius: "50%",
                  backgroundColor: activeStep === i ? step.accent : "rgba(206,118,97,0.25)",
                  border: activeStep === i ? `2px solid ${step.accent}` : "none",
                  transition: "all 0.35s ease",
                  boxShadow: activeStep === i ? `0 0 0 4px ${step.accent}22` : "none",
                }} />
              </div>
            ))}
          </div>

          {/* Right column — image */}
          <div className="journey-image-col" style={{ paddingLeft: "40px", alignSelf: "start", height: "480px", marginTop: "120px" }}
            onMouseEnter={() => setHoveringImage(true)}
            onMouseLeave={() => setHoveringImage(false)}
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "100%", overflow: "hidden" }}
            >
              <img
                src={journeySteps[activeStep].image}
                alt={journeySteps[activeStep].occasion}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Caption */}
              <div style={{
                position: "absolute", bottom: 0, left: "40px", right: 0,
                background: "linear-gradient(to top, rgba(46,34,30,0.75) 0%, transparent 60%)",
                padding: "28px 24px",
              }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontStyle: "italic", fontWeight: 400, color: "#FDF6F0" }}>
                  {journeySteps[activeStep].label}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(253,246,240,0.6)", marginTop: "4px" }}>
                  {journeySteps[activeStep].occasion}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY ARYA BRIDAL ──────────────────────────────────────────────────────────
function WhyArya() {
  const features = [
    { num: "01", title: "Master Artisans", body: "Handcrafted by goldsmiths with over 20 years of experience in traditional Indian jewellery making." },
    { num: "02", title: "BIS Hallmarked", body: "Every piece carries BIS certification — 22K and 18K purity verified and guaranteed." },
    { num: "03", title: "Made to Measure", body: "Custom sizing, engraving, and stone selection. Your bridal jewellery crafted exactly as you envision it." },
    { num: "04", title: "White Glove Care", body: "Complimentary cleaning, polishing, and re-setting for the lifetime of your jewellery." },
  ];
  return (
    <section style={{ backgroundColor: "var(--color-bg-main)", padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>Our Promise</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2E221E" }}>Why Brides Choose ARYAjewels</h2>
        </motion.div>
        <div className="whyarya-grid">
          {features.map((f, i) => (
            <motion.div key={f.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "52px", fontWeight: 300, color: "rgba(206,118,97,0.22)", lineHeight: 1, marginBottom: "16px" }}>{f.num}</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 500, color: "#2E221E", marginBottom: "12px" }}>{f.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", lineHeight: 1.85, color: "#6B5750" }}>{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VIDEO SHOWCASE — two side-by-side videos ────────────────────────────────
function BridalVideoShowcase() {
  const [hovered, setHovered] = useState([false, false]);

  const videos = [
    {
      src: "/Videos/bridal1.mp4",
      caption: "Every strand of gold tells a story.\nWorn on the day that changes everything.",
    },
    {
      src: "/Videos/bridal2.mp4",
      caption: "Crafted for moments that last forever.\nBecause you deserve nothing less than radiant.",
    },
  ];

  const setHov = (i, val) => setHovered((prev) => { const n = [...prev]; n[i] = val; return n; });

  return (
    <section style={{ backgroundColor: "#F7F1EB", padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>
            Trendy Looks
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#2E221E" }}>
            Styled by ARYAjewels
          </h2>
        </motion.div>

        {/* Two small portrait video cards centered */}
        <div className="bridal-video-flex">
          {videos.map((vid, i) => (
            <motion.div
              key={vid.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              onMouseEnter={() => setHov(i, true)}
              onMouseLeave={() => setHov(i, false)}
              style={{
                position: "relative", overflow: "hidden",
                width: "320px", height: "460px",
                flexShrink: 0, cursor: "pointer",
              }}
            >
              <video
                autoPlay muted loop playsInline
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  transform: hovered[i] ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.8s ease",
                }}
              >
                <source src={vid.src} type="video/mp4" />
              </video>

              {/* Base subtle vignette */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(46,34,30,0.6) 0%, transparent 50%)",
                opacity: hovered[i] ? 0 : 1,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
              }} />

              {/* Hover overlay — stronger dark + caption */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(46,34,30,0.58)",
                opacity: hovered[i] ? 1 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "flex-end",
                padding: "32px 24px 64px",
              }}>
                {/* Caption lines */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "18px", fontStyle: "italic", fontWeight: 300,
                  color: "#FDF6F0", lineHeight: 1.65, textAlign: "center",
                  marginBottom: "0",
                  transform: hovered[i] ? "translateY(0)" : "translateY(12px)",
                  transition: "transform 0.4s ease",
                  whiteSpace: "pre-line",
                }}>
                  {vid.caption}
                </p>
              </div>

              {/* Explore Now — always visible at bottom */}
              <div style={{
                position: "absolute", bottom: "24px", left: 0, right: 0,
                display: "flex", justifyContent: "center",
                pointerEvents: "auto",
              }}>
                <Link
                  to="/shop"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "#2E221E", backgroundColor: "#FDF6F0",
                    padding: "10px 22px", textDecoration: "none",
                  }}
                >
                  Explore Now <ArrowRight size={10} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function BridalCTA() {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      backgroundColor: "#2E221E", padding: "120px 48px", textAlign: "center",
    }}>
      {/* Faint decorative ring */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid rgba(235,201,190,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(235,201,190,0.08)", pointerEvents: "none" }} />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#EBC9BE", opacity: 0.65, marginBottom: "20px" }}>
          Your Story Begins Here
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5.5vw, 68px)", fontWeight: 300, fontStyle: "italic", color: "#FDF6F0", lineHeight: 1.15, marginBottom: "40px" }}>
          Let us craft your<br />
          <span style={{ color: "#EBC9BE" }}>perfect bridal look</span>
        </h2>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#2E221E", backgroundColor: "#EBC9BE", padding: "14px 36px", textDecoration: "none", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FDF6F0"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#EBC9BE"}
          >
            Book a Consultation <ArrowRight size={11} />
          </Link>
          <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(253,246,240,0.8)", backgroundColor: "transparent", border: "1px solid rgba(253,246,240,0.25)", padding: "14px 36px", textDecoration: "none" }}>
            Browse All Bridal
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Bridal() {
  // Tell navbar this page has no video — stay solid peach
  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
  }, []);

  return (
    <main>
      <BridalHero />
      <BridalPromise />
      <BridalProducts />
      <BridalJourney />
      <BridalVideoShowcase />
      <WhyArya />
      <BridalCTA />
    </main>
  );
}
