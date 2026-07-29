import { useState } from "react";

export function LeafMark({ size = 28, stroke = "var(--moss)" }) {
  const blade = "M32 60 C20 55 17 34 25 16 C28 10 36 10 39 16 C47 34 44 55 32 60 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d={blade} fill="var(--sage)" stroke={stroke} strokeWidth="2.5" transform="rotate(-30 32 60)" />
      <path d={blade} fill="var(--sage)" stroke={stroke} strokeWidth="2.5" transform="rotate(30 32 60)" />
      <path d={blade} fill="var(--sage)" stroke={stroke} strokeWidth="2.5" />
      <path d="M32 58 C30 46 30 28 32 14" stroke={stroke} strokeWidth="1.2" strokeDasharray="1 5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function LeafDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "3rem 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--sand-deep)" }} />
      <LeafMark size={20} />
      <div style={{ flex: 1, height: 1, background: "var(--sand-deep)" }} />
    </div>
  );
}

export function Price({ value }) {
  return <span style={{ fontFamily: "var(--font-mono)" }}>${value.toFixed(2)}</span>;
}

export function ProductImage({ url, alt, height = 160 }) {
  if (url) {
    return (
      <img
        src={url}
        alt={alt}
        style={{ width: "100%", height, objectFit: "cover", borderRadius: 3, background: "var(--sand-deep)" }}
      />
    );
  }
  return (
    <div style={{ width: "100%", height, background: "var(--sage)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LeafMark size={Math.round(height * 0.3)} />
    </div>
  );
}

export function ProductGallery({ images, alt, height = 420 }) {
  const [selected, setSelected] = useState(0);
  const list = images?.length ? images : [];

  return (
    <div>
      <ProductImage url={list[selected]} alt={alt} height={height} />
      {list.length > 1 && (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {list.map((url, i) => (
            <button
              key={url + i}
              onClick={() => setSelected(i)}
              style={{
                padding: 0,
                width: 56,
                height: 56,
                border: i === selected ? "2px solid var(--moss)" : "1px solid var(--sand-deep)",
                borderRadius: 3,
                background: "none",
                cursor: "pointer",
                overflow: "hidden",
              }}
              aria-label={`Show photo ${i + 1}`}
            >
              <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
