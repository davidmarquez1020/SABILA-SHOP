export function LeafMark({ size = 28, stroke = "var(--moss)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 6 C14 14 8 32 8 48 C8 54 12 58 18 58 C34 58 52 50 56 30 C58 20 52 10 32 6 Z" fill="var(--sage)" stroke={stroke} strokeWidth="2.5" />
      <path d="M32 6 C24 20 22 38 24 56" stroke={stroke} strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
      <path d="M20 22 C26 30 26 42 22 52" stroke={stroke} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M44 18 C40 30 38 42 34 54" stroke={stroke} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
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
