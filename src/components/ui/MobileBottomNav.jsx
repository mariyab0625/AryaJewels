import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, Gem } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const navItems = [
  { to: "/bridal",   Icon: Gem,          label: "Bridal"   },
  { to: "/wishlist", Icon: Heart,        label: "Wishlist" },
  { to: "/cart",     Icon: ShoppingCart, label: "Cart"     },
  { to: "/profile",  Icon: User,         label: "Profile"  },
];

export default function MobileBottomNav() {
  const { cartCount }     = useCart();
  const { wishlistCount } = useWishlist();
  const { pathname }      = useLocation();

  const badges = { "/wishlist": wishlistCount, "/cart": cartCount };

  return (
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
      {navItems.map(({ to, Icon, label }) => {
        const active = pathname === to;
        const badge  = badges[to];
        return (
          <Link key={to} to={to} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "3px",
            textDecoration: "none", position: "relative",
            color: active ? "#CE7661" : "#8A8078",
            transition: "color 0.2s",
          }}>
            <Icon size={20} strokeWidth={active ? 2 : 1.5} />
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
  );
}
