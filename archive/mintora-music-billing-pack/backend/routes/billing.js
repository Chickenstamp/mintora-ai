import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * ENV you must set in backend/.env:
 * STRIPE_SECRET_KEY=sk_test_...
 * STRIPE_WEBHOOK_SECRET=whsec_...   (optional if you don't use webhooks locally)
 *
 * You also need to create Stripe Price IDs:
 *  - MUSIC_PRO_MONTHLY (recurring)
 *  - MUSIC_PACK_10 (one-time)
 *  - MUSIC_PACK_50 (one-time)
 *  For multi-currency, create one Price per currency and pass the correct priceId from the frontend.
 */

// Helper to read a simple user id from headers (replace with real auth later).
function getUserId(req) {
  const uid = req.header("x-user-id") || req.header("X-User-Id");
  if (!uid) throw new Error("Missing X-User-Id header");
  return uid;
}

// Create a subscription checkout for Music Pro (monthly)
router.post("/checkout-subscription", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { priceId, successUrl, cancelUrl } = req.body;
    if (!priceId || !successUrl || !cancelUrl) return res.status(400).json({ error: "Missing fields" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: req.body.email || undefined,
      client_reference_id: userId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { kind: "music_subscription", userId },
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Create a one-time checkout for credit packs
router.post("/checkout-credits", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { priceId, credits, successUrl, cancelUrl } = req.body;
    if (!priceId || !credits || !successUrl || !cancelUrl) return res.status(400).json({ error: "Missing fields" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: req.body.email || undefined,
      client_reference_id: userId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { kind: "music_credits", userId, credits: String(credits) },
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Webhook: grant credits or mark subscription active.
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event;
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      event = req.body; // Not recommended for production.
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const kind = session.metadata?.kind;
        const userId = session.client_reference_id || session.metadata?.userId;
        if (!userId) break;

        if (kind === "music_credits") {
          const credits = Number(session.metadata?.credits || "0");
          // TODO: persist to DB (Supabase). Here we use an in-memory map fallback.
          await grantCredits(userId, credits, session.id);
        }
        break;
      }
      case "invoice.paid": {
        // Recurring subscription payment for Music Pro
        const invoice = event.data.object;
        const sub = await stripe.subscriptions.retrieve(invoice.subscription);
        const userId = sub.metadata?.userId || invoice.metadata?.userId || null;
        if (userId) {
          await markMusicPro(userId, true);
          // Optional: monthly top-up credits for Music Pro subscribers (e.g., +30 tracks)
          await grantCredits(userId, 30, invoice.id, "monthly_topup");
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const userId = sub.metadata?.userId || null;
        if (userId) await markMusicPro(userId, false);
        break;
      }
      default:
        break;
    }

    res.json({ received: true });
  } catch (e) {
    console.error("Webhook error:", e.message);
    res.status(400).send(`Webhook Error: ${e.message}`);
  }
});

// -----------------------------------------------
// Simple in-memory store (replace with Supabase).
// -----------------------------------------------
const memCredits = new Map(); // userId -> { balance, hasMusicPro }
async function grantCredits(userId, delta, sourceId, reason = "purchase") {
  const curr = memCredits.get(userId) || { balance: 0, hasMusicPro: false };
  curr.balance += delta;
  memCredits.set(userId, curr);
  console.log("grantCredits", { userId, delta, sourceId, reason, balance: curr.balance });
}
async function markMusicPro(userId, value) {
  const curr = memCredits.get(userId) || { balance: 0, hasMusicPro: false };
  curr.hasMusicPro = !!value;
  memCredits.set(userId, curr);
  console.log("markMusicPro", { userId, hasMusicPro: curr.hasMusicPro });
}

// Expose simple endpoints for the app
router.get("/credits/balance", async (req, res) => {
  try {
    const userId = getUserId(req);
    const curr = memCredits.get(userId) || { balance: 0, hasMusicPro: false };
    res.json(curr);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/credits/consume", async (req, res) => {
  try {
    const userId = getUserId(req);
    const need = Number(req.body?.amount || 1);
    const curr = memCredits.get(userId) || { balance: 0, hasMusicPro: false };
    if (curr.hasMusicPro) return res.json({ ok: true, balance: curr.balance, reason: "music_pro_unlimited" });
    if (curr.balance < need) return res.status(402).json({ error: "Not enough credits", balance: curr.balance });
    curr.balance -= need;
    memCredits.set(userId, curr);
    res.json({ ok: true, balance: curr.balance });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
