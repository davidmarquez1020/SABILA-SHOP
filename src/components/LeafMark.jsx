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
