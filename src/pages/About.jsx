import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
  }, []);

  return (
    <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px", backgroundColor: "var(--color-bg-main)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>ARYAjewels</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, color: "#2E221E", marginBottom: "16px" }}>
          About Us
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", lineHeight: 1.7 }}>Coming soon</p>
      </div>
    </main>
  );
}
