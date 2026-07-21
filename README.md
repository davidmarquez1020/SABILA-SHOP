# Sábila & Co. — aloe skincare shop

Vite + React storefront with a real (test-mode) Stripe Checkout backend running on Netlify Functions,
and Supabase for order storage.

## How it fits together

```
Browser (React)
  -> POST /.netlify/functions/create-checkout-session   (prices looked up server-side, never trusts the client)
  -> redirected to Stripe's hosted Checkout page
  -> Stripe redirects back to /?session_id=...
  -> GET /.netlify/functions/get-session                (reads the session back from Stripe, for display)

Stripe (async, in the background)
  -> POST /.netlify/functions/stripe-webhook             (signature-verified; this is the source of truth)
  -> writes a row into Supabase `orders`
```

The confirmation page you see in the browser and the order row in the database are two independent
reads of the same Stripe session — that's deliberate. The webhook is what actually marks an order
"real"; the browser redirect is just for the customer's benefit and could in principle fail to load
without affecting whether the order was recorded.

## Local setup

```bash
npm install
npm install -g netlify-cli   # if you don't have it
cp .env.example .env         # fill in the values below
netlify dev                  # runs Vite + the functions together on http://localhost:8888
```

### 1. Stripe (test mode)

1. Create a free account at stripe.com, stay in **test mode**.
2. Dashboard -> Developers -> API keys -> copy the secret key into `STRIPE_SECRET_KEY`.
3. For local webhook testing: `stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook`
   — it will print a `whsec_...` value, put that in `STRIPE_WEBHOOK_SECRET`.
4. Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

### 2. Supabase

1. Create a free project at supabase.com.
2. SQL Editor -> paste the contents of `schema.sql` -> run it. Then do the same with
   `products_schema.sql` (creates and seeds the product catalog).
3. Project Settings -> API -> copy the Project URL into `SUPABASE_URL` and the **service_role**
   key (not the anon key — this needs to bypass RLS) into `SUPABASE_SERVICE_ROLE_KEY`.

## Deploying to Netlify

1. Push this repo to GitHub.
2. Netlify -> Add new site -> Import an existing project -> pick the repo.
   Build command and publish directory are already set in `netlify.toml`, so you can leave those as detected.
3. Site settings -> Environment variables -> add all four from `.env.example`, using your **live**
   Stripe keys when you're ready to charge real cards (keep using test keys until then).
4. Deploy. Once it's live, go back to Stripe -> Developers -> Webhooks -> Add endpoint, pointing at
   `https://your-site-name.netlify.app/.netlify/functions/stripe-webhook`, subscribed to
   `checkout.session.completed`. Copy the signing secret it gives you into `STRIPE_WEBHOOK_SECRET`
   in Netlify's environment variables, and redeploy.

## What's still a placeholder

- **Products** live in a Supabase `products` table now (see `products_schema.sql`), but there's
  no admin page yet — editing the catalog means using the Supabase Table Editor directly.
- **Order confirmation emails** aren't sent — Stripe Checkout can send its own receipt automatically
  (turn it on in Stripe Dashboard -> Settings -> Emails), or you can add a call to something like
  Resend inside the webhook function.
- **The contact form** is UI-only right now; wire it to a function + an email service the same way
  as the webhook if you want it to actually deliver messages.
- **Inventory/stock levels** aren't tracked anywhere — there's nothing stopping overselling a limited
  batch. Worth adding once real stock exists.
