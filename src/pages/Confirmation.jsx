import { useEffect, useState } from "react";
import { LeafMark, Price } from "../components/LeafMark.jsx";
import { getCheckoutSession } from "../lib/api.js";

export function Confirmation({ goTo }) {
  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setStatus("missing");
      return;
    }
    getCheckoutSession(sessionId)
      .then((data) => {
        setOrder(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <main style={{ maxWidth: 600, margin: "0 auto", padding: "4.5rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "#5A5546" }}>Confirming your order…</p>
      </main>
    );
  }

  if (status !== "ready") {
    return (
      <main style={{ maxWidth: 600, margin: "0 auto", padding: "4.5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: 12 }}>We couldn't load that order</h1>
        <p style={{ color: "#5A5546", marginBottom: 24 }}>If you just paid, check your email for a receipt — or reach out from the contact page.</p>
        <button className="btn btn-clay" onClick={() => goTo("shop")}>Back to shop</button>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: "4.5rem 1.5rem", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><LeafMark size={48} /></div>
      <h1 style={{ fontSize: "2rem", marginBottom: 10 }}>Order placed</h1>
      <p style={{ color: "#5A5546", marginBottom: 6 }}>Thanks{order.customerName ? `, ${order.customerName.split(" ")[0]}` : ""} — confirmation sent to {order.customerEmail}.</p>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--clay-deep)", marginBottom: 30 }}>Order #{order.sessionId.slice(-8).toUpperCase()}</p>
      <div className="tag-card" style={{ textAlign: "left", marginBottom: 30 }}>
        {order.items.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "4px 0" }}>
            <span>{item.name} × {item.quantity}</span>
            <Price value={item.amountTotal} />
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--sand-deep)", marginTop: 8, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 500 }}>
          <span>Total</span>
          <Price value={order.total} />
        </div>
      </div>
      <button className="btn btn-clay" onClick={() => goTo("shop")}>Keep browsing</button>
    </main>
  );
}
