export async function createCheckoutSession({ items, customer }) {
  const res = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customer }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Could not start checkout.");
  }
  return res.json();
}

export async function getCheckoutSession(sessionId) {
  const res = await fetch(`/.netlify/functions/get-session?session_id=${encodeURIComponent(sessionId)}`);
  if (!res.ok) throw new Error("Could not load order.");
  return res.json();
}
