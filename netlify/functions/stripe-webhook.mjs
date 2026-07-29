import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ["data.price.product"],
    });

    const { error } = await supabase.from("orders").insert({
      stripe_session_id: session.id,
      customer_name: session.metadata?.customer_name || null,
      customer_email: session.customer_details?.email || session.customer_email,
      shipping_address: {
        address: session.metadata?.address,
        city: session.metadata?.city,
        zip: session.metadata?.zip,
      },
      items: lineItems.data.map((li) => ({
        name: li.description,
        quantity: li.quantity,
        amount_total: li.amount_total / 100,
        product_id: li.price?.product?.metadata?.product_id || null,
      })),
      total: session.amount_total / 100,
      status: "paid",
    });

    if (error) {
      // Log so it's visible in Netlify function logs; still return 200 so Stripe doesn't retry
      // indefinitely for a problem that needs a human to look at the row manually.
      console.error("Failed to record order:", error);
    }

    for (const li of lineItems.data) {
      const productId = li.price?.product?.metadata?.product_id;
      if (!productId) continue; // e.g. the synthetic "Shipping" line item
      const { error: stockError } = await supabase.rpc("decrement_product_stock", {
        p_id: productId,
        p_qty: li.quantity,
      });
      if (stockError) console.error("Failed to decrement stock:", stockError);
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
