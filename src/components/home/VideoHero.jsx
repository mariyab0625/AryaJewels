import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function VideoHero() {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = top, 1 = fully scrolled past
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionH = sectionRef.current.offsetHeight; // 100vh
      const scrollY = window.scrollY;

      // progress: 0 at top, 1 when video fade is complete (at 60% of section)
      const progress = Math.min(Math.max(scrollY / (sectionH * 0.6), 0), 1);
      setScrollProgress(progress);

      // Video is fully gone when opacity hits 0 (progress >= 1/1.4 ≈ 0.714)
      const videoGone = progress >= (1 / 1.4);

      // Broadcast to navbar: are we still over the video?
      window.__videoHeroProgress = progress;
      window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress, videoGone } }));
    };

    window.__videoHeroProgress = 0;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      delete window.__videoHeroProgress;
    };
  }, []);

  const scrollToHero = () => {
    if (!sectionRef.current) return;
    const nextSection = sectionRef.current.nextElementSibling;
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  // Video fades out as gradient grows: opacity goes 1 → 0
  const videoOpacity = Math.max(1 - scrollProgress * 1.4, 0);

  // Gradient overlay gets stronger as you scroll
  const gradientAlpha = Math.min(scrollProgress * 0.9, 0.88);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        // Extra scroll room so sticky video has space to fade before Hero takes over
        height: "180vh",
      }}
    >
      {/* Sticky container — stays pinned while the section is in view */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            opacity: videoOpacity,
            transition: "opacity 0.05s linear",
          }}
        >
          <source src="/Videos/xxx.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay — grows as user scrolls, eventually covers video */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to bottom,
              rgba(253,246,240,0) 0%,
              rgba(253,246,240,${gradientAlpha * 0.4}) 40%,
              rgba(253,246,240,${gradientAlpha}) 100%
            )`,
            pointerEvents: "none",
          }}
        />

        {/* Center text — fades with video */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "20px",
            padding: "0 24px",
            opacity: videoOpacity,
            transition: "opacity 0.05s linear",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.4em",
              color: "rgba(253,246,240,0.8)",
              textTransform: "uppercase",
            }}
          >
            New Collection
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(42px, 7vw, 86px)",
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.1,
              letterSpacing: "0.04em",
              color: "#FDF6F0",
            }}
          >
            Crafted for<br />
            <span style={{ fontWeight: 600, color: "var(--color-bg-frame)" }}>
              Eternity
            </span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "rgba(253,246,240,0.75)",
              maxWidth: "380px",
            }}
          >
            Handcrafted jewellery that carries the warmth of tradition and the elegance of now.
          </p>
        </div>

        {/* Scroll cue — visible only at top */}
        <button
          onClick={scrollToHero}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "none",
            border: "1px solid rgba(253,246,240,0.45)",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#FDF6F0",
            animation: "bounce-down 2s ease-in-out infinite",
            opacity: videoOpacity,
            transition: "opacity 0.1s linear",
          }}
          aria-label="Scroll down"
        >
          <ArrowDown size={18} />
        </button>
      </div>

      <style>{`
        @keyframes bounce-down {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
