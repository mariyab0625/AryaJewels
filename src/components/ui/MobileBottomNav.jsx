import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, Gem } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../auth/AuthModal";

export default function MobileBottomNav() {
  const { cartCount }     = useCart();
  const { wishlistCount } = useWishlist();
  const { user }          = useAuth();
  const { pathname }      = useLocation();
  const [authOpen, setAuthOpen] = useState(false);

  const badges = { "/wishlist": wishlistCount, "/cart": cartCount };

  const navItems = [
    { to: "/bridal",   Icon: Gem,          label: "Bridal",  action: null },
    { to: "/wishlist", Icon: Heart,        label: "Wishlist", action: null },
    { to: "/cart",     Icon: ShoppingCart, label: "Cart",     action: null },
    {
      to: user ? "/profile" : null,
      Icon: User,
      label: "Profile",
      action: user ? null : () => setAuthOpen(true),
    },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        height: "60px", zIndex: 80,
        backgroundColor: "var(--color-bg-main)",
        borderTop: "1px solid rgba(206,118,97,0.18)",
        display: "flex", alignItems: "center",
        boxShadow: "0 -4px 20px rgba(46,34,30,0.06)",
      }}
        className="mobile-bottom-nav"
      >
        {navItems.map(({ to, Icon, label, action }) => {
          const active = pathname === to;
          const badge  = badges[to];

          const content = (
            <>
              {/* Avatar for logged-in profile */}
              {label === "Profile" && user ? (
                user.avatar
                  ? <img src={user.avatar} alt={user.name} style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover", border: active ? "1.5px solid #CE7661" : "1.5px solid #8A8078" }} />
                  : <div style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: active ? "#CE7661" : "#8A8078", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, color: "white" }}>{user.name?.[0]?.toUpperCase()}</span>
                    </div>
              ) : (
                <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              )}
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: "9px",
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontWeight: active ? 600 : 400,
              }}>
                {label}
              </span>
              {badge > 0 && (
                <span style={{
                  position: "absolute", top: "2px",
                  left: "calc(50% + 6px)",
                  backgroundColor: "#CE7661", color: "white",
                  fontSize: "8px", fontWeight: 700,
                  width: "14px", height: "14px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Inter, sans-serif",
                }}>
                  {badge > 9 ? "9+" : badge}
                </span>
              )}
            </>
          );

          const itemStyle = {
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "3px",
            textDecoration: "none", position: "relative",
            color: active ? "#CE7661" : "#8A8078",
            transition: "color 0.2s",
          };

          // Button (for unauthenticated profile)
          if (action) {
            return (
              <button key={label} onClick={action} style={{ ...itemStyle, background: "none", border: "none", cursor: "pointer" }}>
                {content}
              </button>
            );
          }

          // Link
          return (
            <Link key={to} to={to} style={itemStyle}>
              {content}
            </Link>
          );
        })}

        <style>{`
          .mobile-bottom-nav { display: flex !important; }
          @media (min-width: 769px) {
            .mobile-bottom-nav { display: none !important; }
          }
        `}</style>
      </nav>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
