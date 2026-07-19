import { LeafMark, Price } from "./LeafMark.jsx";

export function CartDrawer({ cartItems, cartTotal, setQty, onClose, onCheckout, checkingOut }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(46,42,31,0.35)" }} />
      <div style={{ position: "relative", width: 380, maxWidth: "90vw", background: "var(--sand)", height: "100%", padding: "1.6rem", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: "1.3rem" }}>Your cart</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: "var(--moss-deep)" }} aria-label="Close cart">×</button>
        </div>
        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><LeafMark size={40} /></div>
            <p style={{ color: "#5A5546" }}>Nothing in here yet.</p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 12, borderBottom: "1px solid var(--sand-deep)", paddingBottom: 14 }}>
                  <div style={{ width: 44, height: 44, background: "var(--sage)", borderRadius: 3, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.92rem", fontWeight: 500 }}>{item.name}</p>
                    <p style={{ fontSize: "0.8rem", color: "#5A5546", marginTop: 2 }}><Price value={item.price} /></p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                      <button onClick={() => setQty(item.id, item.qty - 1)} style={{ width: 24, height: 24, border: "1px solid var(--sand-deep)", background: "#fff", borderRadius: 3 }}>−</button>
                      <span style={{ fontSize: "0.9rem" }}>{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} style={{ width: 24, height: 24, border: "1px solid var(--sand-deep)", background: "#fff", borderRadius: 3 }}>+</button>
                      <button onClick={() => setQty(item.id, 0)} className="btn-ghost" style={{ marginLeft: "auto", fontSize: "0.78rem" }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: "1.05rem" }}>
                <span>Subtotal</span>
                <Price value={cartTotal} />
              </div>
              <button className="btn btn-clay" style={{ width: "100%" }} onClick={onCheckout} disabled={checkingOut}>
                {checkingOut ? "Starting checkout…" : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
