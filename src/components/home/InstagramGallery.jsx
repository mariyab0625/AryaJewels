import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&q=80", likes: 1247, comments: 38, productId: 1 },
  { src: "https://images.unsplash.com/photo-1573408301185-9519f94815b6?w=500&q=80", likes: 892,  comments: 24, productId: 8 },
  { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80", likes: 2103, comments: 61, productId: 5 },
  { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80", likes: 743,  comments: 19, productId: 6 },
  { src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&q=80", likes: 1589, comments: 47, productId: 7 },
  { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80", likes: 2341, comments: 72, productId: 4 },
  { src: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=500&q=80", likes: 987,  comments: 31, productId: 3 },
];

// Duplicate for seamless infinite loop
const loopPosts = [...posts, ...posts];

const AvatarIcon = () => (
  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg, #EBC9BE, #CE7661)", flexShrink: 0 }} />
);

function PostCard({ post }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked]     = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: hovered ? "0 16px 48px rgba(46,34,30,0.18)" : "0 2px 14px rgba(46,34,30,0.09)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        width: "200px",
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 10px" }}>
        <AvatarIcon />
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, color: "#2E221E" }}>aryajewels</p>
      </div>

      {/* Image */}
      <div style={{ position: "relative", width: "200px", height: "200px", overflow: "hidden", backgroundColor: "#F2EDE4" }}>
        <img src={post.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.6s ease", display: "block" }} />

        {/* Hover overlay with stats */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(46,34,30,0.42)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "18px",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "white" }}>
            <Heart size={16} fill="white" color="white" />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700 }}>{(liked ? post.likes + 1 : post.likes).toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "white" }}>
            <MessageCircle size={16} fill="white" color="white" />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700 }}>{post.comments}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "8px 10px 6px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
          <button onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", transform: liked ? "scale(1.25)" : "scale(1)", transition: "transform 0.15s" }}>
            <Heart size={15} color={liked ? "#CE7661" : "#2E221E"} fill={liked ? "#CE7661" : "none"} />
          </button>
          <MessageCircle size={15} color="#2E221E" />
          <Send size={15} color="#2E221E" />
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, color: "#2E221E" }}>
          {(liked ? post.likes + 1 : post.likes).toLocaleString()} likes
        </p>
      </div>
    </div>
  );
}

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export default function InstagramGallery() {
  const [paused, setPaused] = useState(false);

  // Total width of one set: 7 cards × (200px + 20px gap) = 1540px
  const totalWidth = posts.length * 220;

  return (
    <section style={{ backgroundColor: "#f7e7e1ff", padding: "80px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px", color: "#B76E79" }}>
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
      </div>

      {/* Infinite scroll strip */}
      <div style={{ overflow: "hidden" }}>
        <div
          className={`ig-scroll-track${paused ? " ig-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {loopPosts.map((post, i) => (
            <div
              key={i}
              style={{ marginBottom: i % 2 === 0 ? "40px" : "0px", flexShrink: 0 }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ig-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-${totalWidth}px); }
        }
        .ig-scroll-track {
          display: flex;
          gap: 20px;
          align-items: flex-end;
          padding-left: 48px;
          padding-bottom: 20px;
          width: max-content;
          animation: ig-slide 10s linear infinite;
        }
        .ig-paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
