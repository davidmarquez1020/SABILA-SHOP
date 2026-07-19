import { useState } from "react";
import { Price } from "../components/LeafMark.jsx";
import { createCheckoutSession } from "../lib/api.js";

export function Checkout({ cartItems, cartTotal, shipping, orderTotal, goTo }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (cartItems.length === 0) {
    return (
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Your cart is empty</h1>
        <p style={{ color: "#5A5546", marginBottom: 24 }}>Add something from the shop before checking out.</p>
        <button className="btn btn-clay" onClick={() => goTo("shop")}>Go to shop</button>
      </main>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      setError("Fill in every field to continue to payment.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { url } = await createCheckoutSession({
        items: cartItems.map((i) => ({ id: i.id, qty: i.qty })),
        customer: form,
      });
      window.location.href = url;
    } catch (err) {
      setError(err.message || "Something went wrong starting checkout.");
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem 4rem", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40 }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", marginBottom: 8 }}>Checkout</h1>
        <p style={{ color: "#5A5546", marginBottom: 24, fontSize: "0.92rem" }}>
          You'll enter card details on Stripe's secure checkout page next — nothing payment-related is handled here.
        </p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3 style={{ fontSize: "1rem", marginTop: 4 }}>Shipping to</h3>
          <input placeholder="Full name" value={form.name} onChange={set("name")} />
          <input type="email" placeholder="Email" value={form.email} onChange={set("email")} />
          <input placeholder="Street address" value={form.address} onChange={set("address")} />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
            <input placeholder="City" value={form.city} onChange={set("city")} />
            <input placeholder="ZIP" value={form.zip} onChange={set("zip")} />
          </div>
          {error && <p style={{ color: "var(--clay-deep)", fontSize: "0.88rem" }}>{error}</p>}
          <button className="btn btn-clay" style={{ marginTop: 10 }} disabled={loading}>
            {loading ? "Redirecting to payment…" : <>Continue to payment — <Price value={orderTotal} /></>}
          </button>
        </form>
      </div>
      <div>
        <div className="tag-card" style={{ position: "sticky", top: 90 }}>
          <h3 style={{ fontSize: "1.05rem", marginBottom: 6 }}>Order summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#4B4636" }}>
              <span>{item.name} × {item.qty}</span>
              <Price value={item.price * item.qty} />
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--sand-deep)", marginTop: 8, paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : <Price value={shipping} />}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 500, marginTop: 6 }}>
            <span>Total</span>
            <Price value={orderTotal} />
          </div>
        </div>
      </div>
    </main>
  );
}
