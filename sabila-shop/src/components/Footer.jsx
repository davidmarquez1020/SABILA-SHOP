import { LeafMark } from "./LeafMark.jsx";

export function Footer({ goTo }) {
  return (
    <footer style={{ background: "var(--moss-deep)", color: "#D9DECB", padding: "2.6rem 1.5rem", marginTop: 40 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LeafMark size={22} stroke="#D9DECB" />
          <span style={{ fontFamily: "var(--font-display)", color: "#F3EFE2" }}>Sábila &amp; Co.</span>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: "0.85rem" }}>
          <button onClick={() => goTo("shop")} style={{ background: "none", border: "none", color: "#D9DECB" }}>Shop</button>
          <button onClick={() => goTo("about")} style={{ background: "none", border: "none", color: "#D9DECB" }}>Our process</button>
          <button onClick={() => goTo("contact")} style={{ background: "none", border: "none", color: "#D9DECB" }}>Contact</button>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#9FA98C" }}>© 2026 Sábila &amp; Co.</p>
      </div>
    </footer>
  );
}
