import { LeafDivider } from "../components/LeafMark.jsx";

export function About() {
  const steps = [
    ["Harvest", "Outer leaves are cut by hand once they've thickened enough to yield real gel."],
    ["Fillet", "Rind is sliced away within hours, before the leaf has a chance to oxidize."],
    ["Cold-press", "Gel is pressed at low temperature so the active compounds stay intact."],
    ["Bottle", "Each run is jarred, dated, and checked before it leaves the workroom."],
  ];
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "3.5rem 1.5rem 4rem" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", color: "var(--clay-deep)", textTransform: "uppercase", marginBottom: 12 }}>Our process</p>
      <h1 style={{ fontSize: "2.3rem", marginBottom: 18 }}>From leaf to jar in four honest steps</h1>
      <p style={{ color: "#4B4636", lineHeight: 1.65, maxWidth: 640, marginBottom: 40 }}>
        Aloe gel starts degrading the moment it's exposed to air. Most of what we do is a race against that clock —
        the fewer hours between the cut and the jar, the more of the leaf actually makes it into your bottle.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 20 }}>
        {steps.map(([t, d], i) => (
          <div key={t} style={{ borderTop: "3px solid var(--moss)", paddingTop: 14 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--clay-deep)" }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 style={{ fontSize: "1.1rem", margin: "6px 0 8px" }}>{t}</h3>
            <p style={{ fontSize: "0.88rem", color: "#5A5546", lineHeight: 1.5 }}>{d}</p>
          </div>
        ))}
      </div>
      <LeafDivider />
      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--moss-deep)", lineHeight: 1.6, fontStyle: "italic" }}>
        We're a small workroom, not a factory line — some weeks we sell out because the leaves simply weren't ready yet, and that's fine by us.
      </p>
    </main>
  );
}
