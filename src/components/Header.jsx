import { useState } from "react";
import { LeafMark } from "./LeafMark.jsx";

export function Header({ page, goTo, cartCount, onCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["home", "Home"],
    ["shop", "Shop"],
    ["about", "Our process"],
    ["contact", "Contact"],
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "var(--sand)", borderBottom: "1px solid var(--sand-deep)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0.9rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => goTo("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none" }} aria-label="Go to home">
          <LeafMark size={30} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--moss-deep)" }}>Sábila &amp; Co.</span>
        </button>

        <nav
          className={`nav-links ${menuOpen ? "open" : ""}`}
          style={{
            display: "flex",
            gap: "1.8rem",
            flexDirection: menuOpen ? "column" : "row",
            position: menuOpen ? "absolute" : "static",
            top: menuOpen ? 64 : "auto",
            left: 0,
            right: 0,
            background: menuOpen ? "var(--sand)" : "none",
            padding: menuOpen ? "1rem 1.5rem" : 0,
            borderBottom: menuOpen ? "1px solid var(--sand-deep)" : "none",
          }}
        >
          {links.map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                goTo(key);
                setMenuOpen(false);
              }}
              className={`nav-link ${page === key ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onCart} style={{ background: "none", border: "none", position: "relative", display: "flex", alignItems: "center" }} aria-label="Open cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--moss-deep)" strokeWidth="1.7">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: -6, right: -8, background: "var(--clay)", color: "#fff", fontSize: 11, borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMenuOpen((v) => !v)} className="hamburger" style={{ background: "none", border: "none", display: "none" }} aria-label="Toggle menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--moss-deep)" strokeWidth="1.7">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
