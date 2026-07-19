import { CATEGORIES } from "../data/products.js";
import { ProductCard } from "../components/ProductCard.jsx";

export function Shop({ category, setCategory, products, addToCart }) {
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: 6 }}>The full range</h1>
      <p style={{ color: "#5A5546", marginBottom: 28 }}>Eight jars, one leaf. Filter by what you're treating.</p>
      <div style={{ display: "flex", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="btn"
            style={{
              padding: "0.5rem 1.1rem",
              fontSize: "0.85rem",
              background: category === c ? "var(--moss)" : "transparent",
              color: category === c ? "#fff" : "var(--moss-deep)",
              border: "1.5px solid var(--moss)",
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 20 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} />
        ))}
      </div>
    </main>
  );
}
