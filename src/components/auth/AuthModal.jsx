import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const inputStyle = {
  width: "100%", padding: "12px 14px",
  fontFamily: "Inter, sans-serif", fontSize: "13px",
  border: "1px solid rgba(46,34,30,0.2)",
  backgroundColor: "#FDF6F0", color: "#2E221E",
  outline: "none", boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  fontFamily: "Inter, sans-serif", fontSize: "10px",
  fontWeight: 500, letterSpacing: "0.15em",
  textTransform: "uppercase", color: "#6B5750",
  display: "block", marginBottom: "6px",
};

export default function AuthModal({ onClose }) {
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register, loginWithGoogle } = useAuth();

  // Form state
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError(""); };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    let result;
    if (tab === "login") {
      result = login({ email: form.email, password: form.password });
    } else {
      if (!form.name.trim()) { setError("Please enter your name."); setLoading(false); return; }
      result = register({ name: form.name, email: form.email, password: form.password });
    }
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    onClose();
  };

  const handleGoogle = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      loginWithGoogle(decoded);
      onClose();
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(46,34,30,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{ backgroundColor: "#FDF6F0", width: "100%", maxWidth: "420px", padding: "40px", position: "relative" }}
        >
          {/* Close */}
          <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#8A8078" }}>
            <X size={18} />
          </button>

          {/* Logo */}
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontStyle: "italic", fontWeight: 600, color: "#CE7661", letterSpacing: "0.15em", textAlign: "center", marginBottom: "28px" }}>
            <span style={{ textTransform: "uppercase" }}>ARYA</span>jewels
          </p>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(46,34,30,0.12)", marginBottom: "28px" }}>
            {["login", "register"].map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(""); }} style={{
                flex: 1, background: "none", border: "none", cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: tab === t ? "#CE7661" : "#8A8078",
                paddingBottom: "12px",
                borderBottom: tab === t ? "2px solid #CE7661" : "2px solid transparent",
                marginBottom: "-1px", transition: "all 0.2s",
              }}>
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {/* Google */}
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogle}
              onError={() => setError("Google sign-in failed.")}
              width="360"
              text={tab === "login" ? "signin_with" : "signup_with"}
              shape="square"
            />
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(46,34,30,0.12)" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", letterSpacing: "0.1em" }}>or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(46,34,30,0.12)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {tab === "register" && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} type="text" placeholder="Your name" value={form.name} onChange={set("name")} required
                  onFocus={(e) => e.target.style.borderColor = "#CE7661"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"}
                />
              </div>
            )}

            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required
                onFocus={(e) => e.target.style.borderColor = "#CE7661"}
                onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"}
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input style={{ ...inputStyle, paddingRight: "44px" }} type={showPass ? "text" : "password"} placeholder="Min. 6 characters" value={form.password} onChange={set("password")} required minLength={6}
                  onFocus={(e) => e.target.style.borderColor = "#CE7661"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(46,34,30,0.2)"}
                />
                <button type="button" onClick={() => setShowPass((s) => !s)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8A8078" }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#B94040", backgroundColor: "#FFF0F0", padding: "10px 14px", border: "1px solid rgba(185,64,64,0.2)" }}>
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} style={{
              backgroundColor: "#CE7661", color: "white", border: "none",
              padding: "14px", cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "Inter, sans-serif", fontSize: "10px",
              fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase",
              opacity: loading ? 0.7 : 1, transition: "background 0.2s",
            }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#B9523C"; }}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#CE7661"}
            >
              {loading ? "Please wait…" : tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Switch tab hint */}
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078", textAlign: "center", marginTop: "20px" }}>
            {tab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setTab(tab === "login" ? "register" : "login"); setError(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#CE7661", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500 }}>
              {tab === "login" ? "Register" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
