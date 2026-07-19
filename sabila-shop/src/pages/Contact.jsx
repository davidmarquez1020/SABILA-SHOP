import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "3.5rem 1.5rem 4rem" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: 10 }}>Get in touch</h1>
      <p style={{ color: "#5A5546", marginBottom: 30 }}>Questions about an order, a skin type, or bulk pricing — send it over.</p>
      {sent ? (
        <div className="tag-card">
          <p style={{ color: "var(--moss-deep)" }}>Message sent. We reply to most notes within a day.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <input placeholder="Your name" required />
          <input type="email" placeholder="you@email.com" required />
          <textarea placeholder="What's on your mind?" rows={5} required />
          <button className="btn btn-clay" style={{ alignSelf: "flex-start" }}>Send message</button>
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
