import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const inputStyle = {
  width: "100%", padding: "13px 16px",
  fontFamily: "Inter, sans-serif", fontSize: "13px",
  border: "1px solid rgba(46,34,30,0.18)",
  backgroundColor: "#FDF6F0", color: "#2E221E",
  outline: "none", boxSizing: "border-box",
  transition: "border-color 0.2s",
};
const labelStyle = {
  fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600,
  letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B5750",
  display: "block", marginBottom: "6px",
};

const OCCASION_OPTIONS = ["Engagement", "Wedding Ceremony", "Reception", "Mehendi / Sangeet", "Anniversary", "Birthday", "Gift", "Other"];
const BUDGET_OPTIONS   = ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "Above ₹1,00,000"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    occasion: "", budget: "",
    preferredDate: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
  }, []);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((err) => ({ ...err, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name   = "Please enter your name";
    if (!form.phone.trim())  e.phone  = "Please enter your phone number";
    if (!form.email.trim())  e.email  = "Please enter your email";
    if (!form.occasion)      e.occasion = "Please select an occasion";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const infoItems = [
    { Icon: Phone,   label: "Call Us",         value: "+91 98200 12345" },
    { Icon: Mail,    label: "Email Us",         value: "hello@aryacollections.in" },
    { Icon: MapPin,  label: "Visit Us",         value: "12, Jewellers Lane, Zaveri Bazaar, Mumbai" },
    { Icon: Clock,   label: "Working Hours",    value: "Mon–Sat, 10am – 7pm" },
  ];

  return (
    <main style={{ backgroundColor: "var(--color-bg-main)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ backgroundColor: "#2E221E", padding: "56px 48px 44px" }} className="page-header-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#EBC9BE", marginBottom: "10px" }}>ARYAjewels</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: "#FDF6F0", lineHeight: 1.15 }}>
            Book a Consultation
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(253,246,240,0.55)", marginTop: "12px", maxWidth: "480px", lineHeight: 1.7 }}>
            Let our jewellery experts help you find the perfect piece. Share a few details and we'll be in touch within 24 hours.
          </p>
        </div>
      </div>

      <div className="page-content-pad" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatePresence mode="wait">
          {submitted ? (
            /* ─── Thank You ─── */
            <motion.div
              key="thankyou"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", padding: "80px 24px" }}
            >
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#EBC9BE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
                <CheckCircle size={32} color="#2E221E" />
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CE7661", marginBottom: "14px" }}>
                Consultation Booked
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "#2E221E", lineHeight: 1.2, marginBottom: "20px" }}>
                Thank you, {form.name.split(" ")[0]}!
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B5750", lineHeight: 1.8, maxWidth: "440px", margin: "0 auto 12px" }}>
                We've received your request for a <strong>{form.occasion}</strong> consultation.
                Our team will reach you on <strong>{form.phone}</strong> within 24 hours.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontStyle: "italic", color: "#CE7661", marginTop: "28px" }}>
                All the beauty is in your hands ✦
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", occasion: "", budget: "", preferredDate: "", message: "" }); }}
                style={{ marginTop: "36px", background: "none", border: "1px solid rgba(46,34,30,0.2)", padding: "12px 28px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2E221E" }}
              >
                Book Another
              </button>
            </motion.div>
          ) : (
            /* ─── Form + Info ─── */
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <div className="contact-layout">

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 400, color: "#2E221E", marginBottom: "28px" }}>
                    Your Details
                  </h2>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

                    {/* Name */}
                    <div style={{ gridColumn: "1/-1" }}>
                      <label style={labelStyle}>Full Name *</label>
                      <input style={{ ...inputStyle, borderColor: errors.name ? "#B94040" : "rgba(46,34,30,0.18)" }}
                        type="text" value={form.name} onChange={set("name")} placeholder="Your full name"
                        onFocus={(e) => e.target.style.borderColor = "#CE7661"}
                        onBlur={(e) => e.target.style.borderColor = errors.name ? "#B94040" : "rgba(46,34,30,0.18)"} />
                      {errors.name && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#B94040", marginTop: "4px" }}>{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={labelStyle}>Phone Number *</label>
                      <input style={{ ...inputStyle, borderColor: errors.phone ? "#B94040" : "rgba(46,34,30,0.18)" }}
                        type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 XXXXX XXXXX"
                        onFocus={(e) => e.target.style.borderColor = "#CE7661"}
                        onBlur={(e) => e.target.style.borderColor = errors.phone ? "#B94040" : "rgba(46,34,30,0.18)"} />
                      {errors.phone && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#B94040", marginTop: "4px" }}>{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input style={{ ...inputStyle, borderColor: errors.email ? "#B94040" : "rgba(46,34,30,0.18)" }}
                        type="email" value={form.email} onChange={set("email")} placeholder="you@email.com"
                        onFocus={(e) => e.target.style.borderColor = "#CE7661"}
                        onBlur={(e) => e.target.style.borderColor = errors.email ? "#B94040" : "rgba(46,34,30,0.18)"} />
                      {errors.email && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#B94040", marginTop: "4px" }}>{errors.email}</p>}
                    </div>

                    {/* Occasion */}
                    <div>
                      <label style={labelStyle}>Occasion *</label>
                      <div style={{ position: "relative" }}>
                        <select value={form.occasion} onChange={set("occasion")}
                          style={{ ...inputStyle, appearance: "none", borderColor: errors.occasion ? "#B94040" : "rgba(46,34,30,0.18)", paddingRight: "36px", cursor: "pointer" }}>
                          <option value="">Select occasion</option>
                          {OCCASION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8A8078", fontSize: "10px" }}>▾</span>
                      </div>
                      {errors.occasion && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#B94040", marginTop: "4px" }}>{errors.occasion}</p>}
                    </div>

                    {/* Budget */}
                    <div>
                      <label style={labelStyle}>Budget Range</label>
                      <div style={{ position: "relative" }}>
                        <select value={form.budget} onChange={set("budget")}
                          style={{ ...inputStyle, appearance: "none", paddingRight: "36px", cursor: "pointer" }}>
                          <option value="">Select budget</option>
                          {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8A8078", fontSize: "10px" }}>▾</span>
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div style={{ gridColumn: "1/-1" }}>
                      <label style={labelStyle}>Preferred Date for Consultation</label>
                      <input style={inputStyle} type="date" value={form.preferredDate} onChange={set("preferredDate")}
                        min={new Date().toISOString().split("T")[0]}
                        onFocus={(e) => e.target.style.borderColor = "#CE7661"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.18)"} />
                    </div>

                    {/* Message */}
                    <div style={{ gridColumn: "1/-1" }}>
                      <label style={labelStyle}>Tell us more (optional)</label>
                      <textarea value={form.message} onChange={set("message")} rows={4}
                        placeholder="Describe what you're looking for — style, stones, metal, any reference images..."
                        style={{ ...inputStyle, resize: "vertical", minHeight: "100px", lineHeight: 1.6 }}
                        onFocus={(e) => e.target.style.borderColor = "#CE7661"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.18)"} />
                    </div>
                  </div>

                  <button type="submit"
                    style={{ marginTop: "24px", backgroundColor: "#CE7661", color: "white", border: "none", padding: "15px 40px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#B9523C"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#CE7661"}
                  >
                    Book Consultation
                  </button>
                </form>

                {/* Info sidebar */}
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 400, color: "#2E221E", marginBottom: "28px" }}>
                    Get In Touch
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
                    {infoItems.map(({ Icon, label, value }) => (
                      <div key={label} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(206,118,97,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={15} color="#CE7661" />
                        </div>
                        <div>
                          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#CE7661", marginBottom: "4px" }}>{label}</p>
                          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#2E221E", lineHeight: 1.6 }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Note */}
                  <div style={{ backgroundColor: "#F7F1EB", padding: "20px 24px", borderLeft: "3px solid #CE7661" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontStyle: "italic", color: "#2E221E", lineHeight: 1.7 }}>
                      "Every piece we craft begins with a conversation. We listen to your story before we shape your jewellery."
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#CE7661", marginTop: "10px" }}>— ARYAjewels</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </main>
  );
}
