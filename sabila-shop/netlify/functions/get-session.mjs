import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req) => {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return new Response(JSON.stringify({ error: "Missing session_id" }), { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        paid: session.payment_status === "paid",
        customerName: session.metadata?.customer_name || "",
        customerEmail: session.customer_details?.email || session.customer_email,
        total: session.amount_total / 100,
        items: lineItems.data.map((li) => ({
          id: li.id,
          name: li.description,
          quantity: li.quantity,
          amountTotal: li.amount_total / 100,
        })),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Order not found." }), { status: 404 });
  }
};
