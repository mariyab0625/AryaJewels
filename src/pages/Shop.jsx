import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";

// ─── Filter config ────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];
const MATERIALS  = ["All", "Yellow Gold", "Rose Gold", "White Gold", "Sterling Silver"];
const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 – ₹25,000", min: 10000, max: 25000 },
  { label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { label: "Above ₹50,000", min: 50000, max: Infinity },
];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "New Arrivals", value: "new" },
];

// ─── Filter pill ──────────────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500,
        letterSpacing: "0.15em", textTransform: "uppercase",
        padding: "7px 16px", border: "1px solid",
        borderColor: active ? "#CE7661" : "rgba(46,34,30,0.2)",
        backgroundColor: active ? "#CE7661" : "transparent",
        color: active ? "#FDF6F0" : "#2E221E",
        cursor: "pointer", transition: "all 0.25s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = "#CE7661"; e.currentTarget.style.color = "#CE7661"; }}}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = "rgba(46,34,30,0.2)"; e.currentTarget.style.color = "#2E221E"; }}}
    >
      {label}
    </button>
  );
}

// ─── Collapsible filter section ───────────────────────────────────────────────
function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: "1px solid rgba(46,34,30,0.1)", paddingBottom: "20px", marginBottom: "20px" }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "0 0 12px 0",
      }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#CE7661" }}>{title}</p>
        <ChevronDown size={13} color="#8A8078" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s ease" }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Shop page ───────────────────────────────────────────────────────────
export default function Shop() {
  const [search, setSearch]             = useState("");
  const [category, setCategory]         = useState("All");
  const [material, setMaterial]         = useState("All");
  const [priceIdx, setPriceIdx]         = useState(0);
  const [sort, setSort]                 = useState("featured");
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new CustomEvent("videoHeroScroll", { detail: { progress: 1, videoGone: true } }));
  }, []);

  const priceRange = PRICE_RANGES[priceIdx];

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.material.toLowerCase().includes(q));
    }
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (material !== "All")  list = list.filter((p) => p.material === material);
    list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    switch (sort) {
      case "price_asc":  list.sort((a, b) => a.price - b.price); break;
      case "price_desc": list.sort((a, b) => b.price - a.price); break;
      case "new":        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew)); break;
      default: break;
    }
    return list;
  }, [search, category, material, priceIdx, sort]);

  const activeFilterCount = (category !== "All" ? 1 : 0) + (material !== "All" ? 1 : 0) + (priceIdx !== 0 ? 1 : 0);

  const clearAll = () => { setCategory("All"); setMaterial("All"); setPriceIdx(0); setSearch(""); };

  return (
    <main style={{ backgroundColor: "var(--color-bg-main)", minHeight: "100vh" }}>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(46,34,30,0.45)", zIndex: 200, backdropFilter: "blur(3px)" }} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 210, backgroundColor: "var(--color-bg-main)", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", padding: "20px 20px 40px", maxHeight: "80vh", overflowY: "auto" }}
            >
              {/* Handle */}
              <div style={{ width: "40px", height: "4px", borderRadius: "2px", backgroundColor: "rgba(46,34,30,0.2)", margin: "0 auto 20px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "#2E221E" }}>Filters</p>
                {activeFilterCount > 0 && (
                  <button onClick={clearAll} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#CE7661", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Clear All ({activeFilterCount})
                  </button>
                )}
              </div>
              <FilterSection title="Category">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {CATEGORIES.map((c) => (
                    <button key={c} onClick={() => setCategory(c)}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", padding: "8px 16px", border: "1px solid", borderColor: category === c ? "#CE7661" : "rgba(46,34,30,0.2)", backgroundColor: category === c ? "#CE7661" : "transparent", color: category === c ? "white" : "#2E221E", cursor: "pointer", borderRadius: "2px" }}>
                      {c}
                    </button>
                  ))}
                </div>
              </FilterSection>
              <FilterSection title="Material">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {MATERIALS.map((m) => (
                    <button key={m} onClick={() => setMaterial(m)}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", padding: "8px 16px", border: "1px solid", borderColor: material === m ? "#CE7661" : "rgba(46,34,30,0.2)", backgroundColor: material === m ? "#CE7661" : "transparent", color: material === m ? "white" : "#2E221E", cursor: "pointer", borderRadius: "2px" }}>
                      {m}
                    </button>
                  ))}
                </div>
              </FilterSection>
              <FilterSection title="Price Range">
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {PRICE_RANGES.map((r, i) => (
                    <button key={r.label} onClick={() => setPriceIdx(i)}
                      style={{ textAlign: "left", fontFamily: "Inter, sans-serif", fontSize: "13px", background: "none", border: "none", cursor: "pointer", color: priceIdx === i ? "#CE7661" : "#2E221E", fontWeight: priceIdx === i ? 600 : 400, padding: "6px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: priceIdx === i ? "#CE7661" : "transparent", border: "1px solid", borderColor: priceIdx === i ? "#CE7661" : "rgba(46,34,30,0.3)", flexShrink: 0 }} />
                      {r.label}
                    </button>
                  ))}
                </div>
              </FilterSection>
              <button onClick={() => setMobileFilterOpen(false)}
                style={{ width: "100%", backgroundColor: "#2E221E", color: "white", border: "none", padding: "14px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", marginTop: "8px" }}>
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page header */}
      <div className="shop-header-pad">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#EBC9BE", marginBottom: "10px" }}>
            ARYAjewels
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, color: "#FDF6F0", marginBottom: "20px" }}>
            All Jewellery
          </h1>

          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: "480px" }}>
            <Search size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(253,246,240,0.5)" }} />
            <input
              type="text"
              placeholder="Search rings, necklaces, gold…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px 12px 40px",
                fontFamily: "Inter, sans-serif", fontSize: "12px",
                border: "1px solid rgba(253,246,240,0.2)",
                backgroundColor: "rgba(253,246,240,0.08)", color: "#FDF6F0",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8A8078" }}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 48px" }} className="shop-content-pad">

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Desktop sidebar toggle */}
            <button onClick={() => setSidebarOpen((o) => !o)} className="desktop-filter-btn" style={{ display: "flex", alignItems: "center", gap: "7px", background: "none", border: "1px solid rgba(46,34,30,0.2)", padding: "8px 16px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2E221E" }}>
              <SlidersHorizontal size={13} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            {/* Mobile filter button */}
            <button onClick={() => setMobileFilterOpen(true)} className="mobile-filter-btn" style={{ display: "none", alignItems: "center", gap: "7px", background: "none", border: "1px solid rgba(46,34,30,0.2)", padding: "8px 16px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2E221E" }}>
              <SlidersHorizontal size={13} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#CE7661", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "5px" }}>
                <X size={11} /> Clear
              </button>
            )}
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078" }}>
              {filtered.length} items
            </p>
          </div>

          {/* Sort */}
          <div style={{ position: "relative" }}>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.1em",
                border: "1px solid rgba(46,34,30,0.2)", backgroundColor: "transparent",
                color: "#2E221E", padding: "8px 32px 8px 14px",
                cursor: "pointer", outline: "none", appearance: "none",
              }}
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={12} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8A8078" }} />
          </div>
        </div>

        <div className={sidebarOpen ? "shop-layout-with-sidebar" : "shop-layout-no-sidebar"}>

          {/* ── Sidebar filters ── */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                style={{ position: "sticky", top: "80px" }}
              >
                {/* Category */}
                <FilterSection title="Category">
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {CATEGORIES.map((c) => (
                      <button key={c} onClick={() => setCategory(c)} style={{
                        background: "none", border: "none", cursor: "pointer", textAlign: "left",
                        fontFamily: "Inter, sans-serif", fontSize: "12px",
                        color: category === c ? "#CE7661" : "#2E221E",
                        fontWeight: category === c ? 600 : 400,
                        padding: "4px 0", letterSpacing: "0.05em",
                        display: "flex", alignItems: "center", gap: "8px",
                      }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: category === c ? "#CE7661" : "transparent", border: "1px solid", borderColor: category === c ? "#CE7661" : "rgba(46,34,30,0.3)", flexShrink: 0, transition: "all 0.2s" }} />
                        {c}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Material */}
                <FilterSection title="Material">
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {MATERIALS.map((m) => (
                      <button key={m} onClick={() => setMaterial(m)} style={{
                        background: "none", border: "none", cursor: "pointer", textAlign: "left",
                        fontFamily: "Inter, sans-serif", fontSize: "12px",
                        color: material === m ? "#CE7661" : "#2E221E",
                        fontWeight: material === m ? 600 : 400,
                        padding: "4px 0", letterSpacing: "0.05em",
                        display: "flex", alignItems: "center", gap: "8px",
                      }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: material === m ? "#CE7661" : "transparent", border: "1px solid", borderColor: material === m ? "#CE7661" : "rgba(46,34,30,0.3)", flexShrink: 0, transition: "all 0.2s" }} />
                        {m}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Price */}
                <FilterSection title="Price Range">
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {PRICE_RANGES.map((r, i) => (
                      <button key={r.label} onClick={() => setPriceIdx(i)} style={{
                        background: "none", border: "none", cursor: "pointer", textAlign: "left",
                        fontFamily: "Inter, sans-serif", fontSize: "12px",
                        color: priceIdx === i ? "#CE7661" : "#2E221E",
                        fontWeight: priceIdx === i ? 600 : 400,
                        padding: "4px 0", letterSpacing: "0.05em",
                        display: "flex", alignItems: "center", gap: "8px",
                      }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: priceIdx === i ? "#CE7661" : "transparent", border: "1px solid", borderColor: priceIdx === i ? "#CE7661" : "rgba(46,34,30,0.3)", flexShrink: 0, transition: "all 0.2s" }} />
                        {r.label}
                      </button>
                    ))}
                  </div>
                </FilterSection>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ── Product grid ── */}
          <div>
            {/* Active filter pills */}
            {activeFilterCount > 0 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                {category !== "All" && <FilterPill label={category} active onClick={() => setCategory("All")} />}
                {material !== "All" && <FilterPill label={material} active onClick={() => setMaterial("All")} />}
                {priceIdx !== 0 && <FilterPill label={PRICE_RANGES[priceIdx].label} active onClick={() => setPriceIdx(0)} />}
              </div>
            )}

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: "#2E221E", marginBottom: "12px" }}>No pieces found</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078", marginBottom: "24px" }}>Try adjusting your filters or search term.</p>
                <button onClick={clearAll} style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#CE7661", background: "none", border: "1px solid #CE7661", padding: "10px 24px", cursor: "pointer" }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={sidebarOpen ? "product-grid-3" : "product-grid-4"}
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: i < 12 ? i * 0.04 : 0 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
