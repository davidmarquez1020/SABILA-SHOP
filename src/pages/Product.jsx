import { Price, ProductGallery } from "../components/LeafMark.jsx";

export function Product({ product, addToCart, goTo }) {
  if (!product) {
    return (
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Product not found</h1>
        <button className="btn btn-clay" onClick={() => goTo("shop")}>Back to shop</button>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
      <ProductGallery images={product.image_urls} alt={product.name} height={420} />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--moss-deep)" }}>{product.category}</span>
          {product.tag && (
            <span style={{ fontSize: 12, background: "var(--sage)", color: "var(--moss-deep)", padding: "3px 10px", borderRadius: 2, fontWeight: 500 }}>{product.tag}</span>
          )}
        </div>
        <h1 style={{ fontSize: "2rem", marginTop: 8 }}>{product.name}</h1>
        <p style={{ fontSize: "1rem", color: "#5A5546", lineHeight: 1.6, marginTop: 14 }}>{product.blurb}</p>
        <p style={{ fontSize: "0.85rem", color: "var(--clay-deep)", fontStyle: "italic", marginTop: 10 }}>{product.note}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
          <span style={{ fontSize: "1.4rem" }}><Price value={product.price} /></span>
          <span style={{ fontSize: "0.85rem", color: "var(--clay-deep)" }}>
            {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
          </span>
        </div>

        <button
          className="btn btn-clay"
          style={{ marginTop: 20, padding: "0.75rem 1.5rem" }}
          onClick={() => addToCart(product.id)}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Sold out" : "Add to cart"}
        </button>

        <div style={{ marginTop: 24 }}>
          <button className="btn-ghost" onClick={() => goTo("shop")}>← Back to shop</button>
        </div>
      </div>

      {product.description && (
        <div style={{ gridColumn: "1 / -1", borderTop: "1px solid var(--sand-deep)", paddingTop: 24, marginTop: 8 }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: 10 }}>Description</h2>
          <p style={{ fontSize: "0.95rem", color: "#4B4636", lineHeight: 1.7, maxWidth: 700, whiteSpace: "pre-line" }}>
            {product.description}
          </p>
        </div>
      )}
    </main>
  );
}
