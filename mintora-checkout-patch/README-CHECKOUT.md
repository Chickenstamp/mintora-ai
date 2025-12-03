# Checkout Patch (Stripe sessions wired)

This patch adds:
- `backend/routes/checkoutRoutes.js` — endpoints
  - `GET /api/checkout/config` — exposes price IDs for UI
  - `POST /api/checkout/subscription` — creates subscription session
  - `POST /api/checkout/oneoff` — creates one-off payment session
- `backend/config/stripe_price_ids.json` — paste your Stripe **price IDs** here (per plan/pack & currency)
- `frontend/src/pages/Checkout.jsx` — simple UI to initiate checkout
- `server.patch.txt` — lines to import & mount the routes

## How to use
1. Run the Stripe creation script in your project:
   ```bash
   node backend/scripts/create_stripe_products_strategy.js
   ```
   Copy the **price IDs** printed to console into `backend/config/stripe_price_ids.json` **and** (optionally) keep a copy in a secret manager.

2. Mount routes in `backend/server.js`:
   ```js
   import checkoutRoutes from "./routes/checkoutRoutes.js";
   app.use("/", checkoutRoutes);
   ```

3. Add a "Checkout" tab/page in your frontend:
   ```js
   import Checkout from './pages/Checkout.jsx'
   // add a nav button and render <Checkout/>
   ```

4. Deploy backend & frontend, then open **Checkout** page.
