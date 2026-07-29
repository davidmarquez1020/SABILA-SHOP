import { Price, ProductImage } from "./LeafMark.jsx";

export function ProductCard({ product, onAdd, onView }) {
  return (
    <div className="tag-card">
      <div onClick={() => onView?.(product.id)} style={{ cursor: onView ? "pointer" : "default" }}>
        <ProductImage url={product.image_urls?.[0]} alt={product.name} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--moss-deep)" }}>{product.category}</span>
          {product.tag && (
            <span style={{ fontSize: 11, background: "var(--sage)", color: "var(--moss-deep)", padding: "2px 8px", borderRadius: 2, fontWeight: 500 }}>{product.tag}</span>
          )}
        </div>
        <h3 style={{ fontSize: "1.15rem" }}>{product.name}</h3>
      </div>
      <p style={{ fontSize: "0.88rem", color: "#5A5546", lineHeight: 1.5, flex: 1 }}>{product.blurb}</p>
      <p style={{ fontSize: "0.78rem", color: "var(--clay-deep)", fontStyle: "italic" }}>{product.note}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
        <span style={{ fontSize: "1.05rem" }}>
          <Price value={product.price} />
          {product.stock > 0 && product.stock <= 5 && (
            <span style={{ display: "block", fontSize: "0.75rem", color: "var(--clay-deep)" }}>Only {product.stock} left</span>
          )}
        </span>
        <button
          className="btn btn-outline"
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          onClick={onAdd}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
