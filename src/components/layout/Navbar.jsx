import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../auth/AuthModal";

// ─── Shop dropdown data ───────────────────────────────────────────────────────
const shopDropdown = {
  collections: [
    { label: "New Arrivals",   to: "/shop" },
    { label: "Bridal Edit",    to: "/bridal" },
    { label: "Everyday Luxe", to: "/shop" },
    { label: "Gift Sets",      to: "/shop" },
  ],
  category: [
    { label: "Rings",      to: "/shop" },
    { label: "Necklaces",  to: "/shop" },
    { label: "Earrings",   to: "/shop" },
    { label: "Bracelets",  to: "/shop" },
  ],
  byMetal: [
    { label: "18k Gold",        to: "/shop" },
    { label: "Rose Gold",       to: "/shop" },
    { label: "Sterling Silver", to: "/shop" },
    { label: "Diamond",         to: "/shop" },
  ],
  featured: {
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=85",
    title: "Bridal Edit 2025",
    sub: "Crafted for your forever",
    to: "/bridal",
  },
};

// ─── Shop trigger with dropdown ──────────────────────────────────────────────
function ShopDropdown({ overVideo }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const textColor = overVideo ? "rgba(253,246,240,0.9)" : "var(--color-text-dark)";

  const show = () => { clearTimeout(timerRef.current); setOpen(true); };
  const hide = () => { timerRef.current = setTimeout(() => setOpen(false), 120); };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div ref={ref} onMouseEnter={show} onMouseLeave={hide} style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
      {/* Trigger */}
      <button className="shop-trigger" style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: textColor, display: "inline-flex", alignItems: "center", gap: "5px",
        padding: "8px 0", position: "relative", transition: "color 0.25s ease",
      }}>
        <Link to="/shop" style={{ color: "inherit", textDecoration: "none" }}>Shop</Link>
        <ChevronDown size={11} style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      {/* Mega dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={show}
            onMouseLeave={hide}
            style={{
              position: "absolute",
              top: "54px",
              left: 0,
              width: "55vw",
              zIndex: 50,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 8px 40px rgba(46,34,30,0.12)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 200px",
            }}
          >
            {/* Collections */}
            <div style={{ padding: "36px 40px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CE7661", marginBottom: "20px" }}>
                Collections
              </p>
              {shopDropdown.collections.map((item) => (
                <Link key={item.label} to={item.to} onClick={() => setOpen(false)} style={{
                  display: "block", fontFamily: "Inter, sans-serif", fontSize: "13px",
                  color: "#2E221E", textDecoration: "none", marginBottom: "14px",
                  letterSpacing: "0.02em", transition: "color 0.2s ease",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#CE7661"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#2E221E"}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Category */}
            <div style={{ padding: "36px 40px", borderLeft: "1px solid #F2EDE4" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CE7661", marginBottom: "20px" }}>
                Category
              </p>
              {shopDropdown.category.map((item) => (
                <Link key={item.label} to={item.to} onClick={() => setOpen(false)} style={{
                  display: "block", fontFamily: "Inter, sans-serif", fontSize: "13px",
                  color: "#2E221E", textDecoration: "none", marginBottom: "14px",
                  letterSpacing: "0.02em", transition: "color 0.2s ease",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#CE7661"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#2E221E"}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* By Metal */}
            <div style={{ padding: "36px 40px", borderLeft: "1px solid #F2EDE4" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CE7661", marginBottom: "20px" }}>
                By Metal
              </p>
              {shopDropdown.byMetal.map((item) => (
                <Link key={item.label} to={item.to} onClick={() => setOpen(false)} style={{
                  display: "block", fontFamily: "Inter, sans-serif", fontSize: "13px",
                  color: "#2E221E", textDecoration: "none", marginBottom: "14px",
                  letterSpacing: "0.02em", transition: "color 0.2s ease",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#CE7661"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#2E221E"}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Featured image */}
            <Link to={shopDropdown.featured.to} onClick={() => setOpen(false)} style={{ textDecoration: "none", display: "block", position: "relative", overflow: "hidden" }}>
              <img
                src={shopDropdown.featured.image}
                alt={shopDropdown.featured.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(46,34,30,0.72) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "24px", left: "20px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontStyle: "italic", fontWeight: 500, color: "#FDF6F0", margin: 0 }}>
                  {shopDropdown.featured.title}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(253,246,240,0.7)", marginTop: "4px", letterSpacing: "0.08em" }}>
                  {shopDropdown.featured.sub}
                </p>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const simpleLinks = [
  { label: "Bridal", to: "/bridal" },
  { label: "About Us", to: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overVideo, setOverVideo] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onVideoScroll = (e) => {
      setOverVideo(!e.detail.videoGone);
    };
    window.addEventListener("videoHeroScroll", onVideoScroll);
    return () => window.removeEventListener("videoHeroScroll", onVideoScroll);
  }, []);

  const navBg = overVideo ? "rgba(30, 20, 16, 0.35)" : "var(--color-bg-frame)";
  const navTextColor = overVideo ? "#FDF6F0" : "var(--color-text-dark)";
  const logoColor = overVideo ? "#FDF6F0" : "var(--color-accent-rust)";

  return (
    <>
      <header
        className={overVideo ? "nav-transparent" : ""}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
          backgroundColor: navBg,
          backdropFilter: overVideo ? "blur(6px)" : "none",
          borderBottom: overVideo ? "none" : "1px solid rgba(206, 118, 97, 0.2)",
          transition: "background-color 0.15s ease, border-bottom 0.15s ease",
          padding: "0 24px", height: "54px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        {/* Left Nav */}
        <nav className="hidden-mobile" style={{ display: "flex", gap: "28px", alignItems: "center", height: "100%" }}>
          <ShopDropdown overVideo={overVideo} />
          {simpleLinks.map((link) => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile trigger */}
        <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: navTextColor, display: "none", transition: "color 0.4s ease" }} className="mobile-menu-btn">
          <Menu size={20} />
        </button>

        {/* Center Logo */}
        <Link to="/" style={{ textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "24px", fontWeight: 600, fontStyle: "italic", letterSpacing: "0.18em", color: logoColor, transition: "color 0.4s ease" }}>
            <span style={{ textTransform: "uppercase" }}>ARYA</span>jewels
          </span>
        </Link>

        {/* Right Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: navTextColor, display: "flex", padding: "4px", transition: "color 0.4s ease" }}>
            <Search size={18} />
          </button>
          <Link to="/wishlist" style={{ position: "relative", color: navTextColor, display: "flex", padding: "4px", transition: "color 0.4s ease" }} title="Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span style={{ position: "absolute", top: "-4px", right: "-4px", background: "var(--color-accent-rust)", color: "white", fontSize: "8px", width: "14px", height: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" style={{ position: "relative", color: navTextColor, display: "flex", padding: "4px", transition: "color 0.4s ease" }} title="Cart">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-4px", right: "-4px", background: "var(--color-accent-rust)", color: "white", fontSize: "8px", width: "14px", height: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile / Login */}
          {user ? (
            <Link to="/profile" title="My Account" style={{ position: "relative", color: navTextColor, display: "flex", padding: "4px", transition: "color 0.4s ease" }}>
              {user.avatar
                ? <img src={user.avatar} alt={user.name} style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(206,118,97,0.6)" }} />
                : <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#CE7661", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, color: "white" }}>{user.name?.[0]?.toUpperCase()}</span>
                  </div>
              }
            </Link>
          ) : (
            <button onClick={() => setAuthOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: navTextColor, display: "flex", padding: "4px", transition: "color 0.4s ease" }} title="Sign In">
              <User size={18} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(46, 34, 30, 0.4)", zIndex: 100, backdropFilter: "blur(4px)" }} />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.28 }}
              style={{ position: "fixed", top: 0, left: 0, height: "100%", width: "280px", background: "var(--color-bg-main)", borderRight: "1px solid var(--color-border)", zIndex: 110, padding: "32px 24px", display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "20px", fontWeight: 600, color: "var(--color-accent-rust)", letterSpacing: "0.15em" }}>
                  <span style={{ textTransform: "uppercase" }}>ARYA</span>jewels
                </span>
                <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-dark)" }}>
                  <X size={20} />
                </button>
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {/* Shop section */}
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CE7661", marginBottom: "12px" }}>Shop</p>
                {[...shopDropdown.collections, ...shopDropdown.category].map((item) => (
                  <NavLink key={item.label} to={item.to} onClick={() => setMobileOpen(false)}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 400, letterSpacing: "0.08em", color: "var(--color-text-dark)", textDecoration: "none", paddingBottom: "10px", marginBottom: "2px" }}>
                    {item.label}
                  </NavLink>
                ))}
                <div style={{ height: "1px", backgroundColor: "var(--color-border)", margin: "16px 0" }} />
                <NavLink to="/bridal" onClick={() => setMobileOpen(false)} style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-dark)", textDecoration: "none", marginBottom: "16px" }}>Bridal</NavLink>
                <NavLink to="/about" onClick={() => setMobileOpen(false)} style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-dark)", textDecoration: "none", marginBottom: "16px" }}>About Us</NavLink>
                <NavLink to="/contact" onClick={() => setMobileOpen(false)} style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-dark)", textDecoration: "none" }}>Contact</NavLink>
              </nav>
              <div style={{ marginTop: "auto" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "var(--color-text-light)", fontSize: "14px" }}>
                  All the beauty is in your hands
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .nav-link {
          font-family: Inter, sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--color-text-dark); text-decoration: none;
          position: relative; padding: 8px 0; display: inline-block;
          transition: color 0.25s ease;
        }
        .nav-link:hover { color: var(--color-accent-rust); }
        .nav-transparent .nav-link { color: rgba(253,246,240,0.9); }
        .nav-transparent .nav-link:hover { color: #FDF6F0; }
        .nav-link--active { color: var(--color-accent-rust); }
        .nav-link--active::after {
          content: ''; position: absolute; bottom: 2px; left: 0;
          width: 100%; height: 1.5px;
          background-color: var(--color-accent-rust);
        }
        .nav-transparent .nav-link--active { color: #FDF6F0; }
        .nav-transparent .nav-link--active::after { background-color: #FDF6F0; }

        /* Shop trigger button hover */
        .shop-trigger:hover { color: var(--color-accent-rust) !important; }
        .nav-transparent .shop-trigger:hover { color: #FDF6F0 !important; }
      `}</style>
    </>
  );
}
