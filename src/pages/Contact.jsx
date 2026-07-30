import { useState } from "react";
import { sendContactMessage } from "../lib/api.js";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendContactMessage(form);
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong sending your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "3.5rem 1.5rem 4rem" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: 10 }}>Get in touch</h1>
      <p style={{ color: "#5A5546", marginBottom: 30 }}>Questions about an order, a skin type, or bulk pricing — send it over.</p>
      {sent ? (
        <div className="tag-card">
          <p style={{ color: "var(--moss-deep)" }}>Message sent. We reply to most notes within a day.</p>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input placeholder="Your name" value={form.name} onChange={set("name")} required />
          <input type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required />
          <textarea placeholder="What's on your mind?" rows={5} value={form.message} onChange={set("message")} required />
          {error && <p style={{ color: "var(--clay-deep)", fontSize: "0.88rem" }}>{error}</p>}
          <button className="btn btn-clay" style={{ alignSelf: "flex-start" }} disabled={loading}>
            {loading ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, fontSize: "0.9rem", color: "#5A5546" }}>
        <div><strong style={{ color: "var(--moss-deep)" }}>Email</strong><br />hello@sabilaandco.example</div>
        <div><strong style={{ color: "var(--moss-deep)" }}>Workroom hours</strong><br />Tue–Sat, 9am–4pm</div>
        <div><strong style={{ color: "var(--moss-deep)" }}>Ships from</strong><br />Rio Grande Valley, TX</div>
      </div>
    </main>
  );
}
