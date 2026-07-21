import { ProductCard } from "../components/ProductCard.jsx";
import { LeafDivider } from "../components/LeafMark.jsx";

export function Home({ goTo, addToCart, products }) {
  const featured = products.slice(0, 3);
  return (
    <main>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "3.5rem 1.5rem 2rem", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "2.5rem", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", color: "var(--clay-deep)", textTransform: "uppercase", marginBottom: 14 }}>Cut fresh. Bottled honest.</p>
          <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.08, marginBottom: 20 }}>
            Your skin already knows what to do with water. <em>We just bring the leaf.</em>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#4B4636", lineHeight: 1.65, maxWidth: 460, marginBottom: 28 }}>
            Small-batch aloe skincare, filleted by hand and pressed within a day of harvest. No fillers pretending to be gel.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button className="btn btn-clay" onClick={() => goTo("shop")}>Shop the range</button>
            <button className="btn btn-outline" onClick={() => goTo("about")}>See how it's made</button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg width="280" height="340" viewBox="0 0 280 340" fill="none">
            <path d="M140 322 C110 300 96 220 106 120 C112 78 124 52 140 40 C156 52 168 78 174 120 C184 220 170 300 140 322 Z" fill="var(--sage)" stroke="var(--moss)" strokeWidth="2.5" opacity="0.85" transform="translate(140,322) rotate(-45) scale(1,0.62) translate(-140,-322)" />
            <path d="M140 322 C110 300 96 220 106 120 C112 78 124 52 140 40 C156 52 168 78 174 120 C184 220 170 300 140 322 Z" fill="var(--sage)" stroke="var(--moss)" strokeWidth="2.5" opacity="0.85" transform="translate(140,322) rotate(45) scale(1,0.62) translate(-140,-322)" />
            <path d="M140 322 C110 300 96 220 106 120 C112 78 124 52 140 40 C156 52 168 78 174 120 C184 220 170 300 140 322 Z" fill="var(--sage)" stroke="var(--moss)" strokeWidth="2.5" opacity="0.92" transform="translate(140,322) rotate(-22) scale(1,0.85) translate(-140,-322)" />
            <path d="M140 322 C110 300 96 220 106 120 C112 78 124 52 140 40 C156 52 168 78 174 120 C184 220 170 300 140 322 Z" fill="var(--sage)" stroke="var(--moss)" strokeWidth="2.5" opacity="0.92" transform="translate(140,322) rotate(22) scale(1,0.85) translate(-140,-322)" />
            <path d="M140 322 C110 300 96 220 106 120 C112 78 124 52 140 40 C156 52 168 78 174 120 C184 220 170 300 140 322 Z" fill="var(--sage)" stroke="var(--moss)" strokeWidth="3" />
            <ellipse cx="140" cy="185" rx="30" ry="110" fill="#EAF0DE" opacity="0.55" />
            <path d="M140 318 C132 260 130 160 140 60" stroke="var(--moss)" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      <section style={{ background: "var(--moss)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, color: "#F3EFE2" }}>
          {[
            ["One leaf, one day", "Every batch starts and finishes filleting within 24 hours of cutting."],
            ["Nothing hiding the gel", "No mineral oil, no synthetic thickener standing in for the real thing."],
            ["Small enough to check by hand", "Runs are capped small so each jar gets looked at before it ships."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 style={{ color: "#F3EFE2", fontSize: "1.15rem", marginBottom: 8 }}>{t}</h3>
              <p style={{ fontSize: "0.92rem", color: "#D9DECB", lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "3.5rem 1.5rem 1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <h2 style={{ fontSize: "1.7rem" }}>Reach for these first</h2>
          <button className="btn-ghost" onClick={() => goTo("shop")}>View all products</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} />
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 1.5rem" }}>
        <LeafDivider />
      </div>

      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem 4rem", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontStyle: "italic", color: "var(--moss-deep)", lineHeight: 1.5 }}>
          "We stopped asking how long a gel could sit on a shelf, and started asking how little it needed to."
        </p>
        <p style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--clay-deep)", textTransform: "uppercase", letterSpacing: "0.06em" }}>— Founding note</p>
      </section>
    </main>
  );
}
