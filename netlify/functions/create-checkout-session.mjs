import Stripe from "stripe";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const products = JSON.parse(readFileSync(path.join(__dirname, "../../shared/products.json"), "utf-8"));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SITE_URL = process.env.SITE_URL || "http://localhost:8888";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { items, customer } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty." }), { status: 400 });
    }
    if (!customer?.name || !customer?.email || !customer?.address) {
      return new Response(JSON.stringify({ error: "Missing shipping details." }), { status: 400 });
    }

    // Look up every price server-side. Never trust a price sent from the browser.
    const line_items = items.map(({ id, qty }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error(`Unknown product: ${id}`);
      const quantity = Math.max(1, Math.min(20, Number(qty) || 1));
      return {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: { name: product.name },
        },
      };
    });

    const subtotal = items.reduce((sum, { id, qty }) => {
      const product = products.find((p) => p.id === id);
      return sum + (product ? product.price * qty : 0);
    }, 0);
    if (subtotal < 40) {
      line_items.push({
        quantity: 1,
        price_data: { currency: "usd", unit_amount: 500, product_data: { name: "Shipping" } },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customer.email,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      success_url: `${SITE_URL}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checkout`,
      metadata: {
        customer_name: customer.name,
        address: customer.address,
        city: customer.city || "",
        zip: customer.zip || "",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Checkout failed." }), { status: 500 });
  }
};
