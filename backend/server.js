import express from "express";
import cors from "cors";
import Stripe from "stripe";
import enterpriseRoutes from "./routes/enterprise.js";
app.use("/api/enterprise", enterpriseRoutes);


// ==============================
// App setup
// ==============================
const app = express();
app.use(cors());
app.use(express.json());

// ==============================
// Environment variables
// ==============================
const {
  STRIPE_SECRET_KEY,
  BASE_PLATFORM_FEE_USD,
} = process.env;

if (!STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY missing in environment variables");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// ==============================
// Health check (Render needs this)
// ==============================
app.get("/", (req, res) => {
  res.json({ status: "Mintora backend running ✅" });
});

// ==============================
// ENTERPRISE PRICE CALCULATOR
// ==============================
// POST /api/enterprise/quote
app.post("/api/enterprise/quote", (req, res) => {
  try {
    const {
      users = 1,
      monthlyImages = 0,
      monthlyVideos = 0,
      monthlyMusic = 0,
      gamingAssets = false,
      customModels = false,
      supportLevel = "standard", // standard | priority | dedicated
    } = req.body;

    // ------------------------------
    // Base platform fee
    // ------------------------------
    let total = Number(BASE_PLATFORM_FEE_USD || 48999);

    // ------------------------------
    // Usage pricing (example model)
    // ------------------------------
    total += users * 1200;
    total += monthlyImages * 0.04;
    total += monthlyVideos * 2.5;
    total += monthlyMusic * 1.25;

    if (gamingAssets) total += 12000;
    if (customModels) total += 25000;

    if (supportLevel === "priority") total += 8000;
    if (supportLevel === "dedicated") total += 18000;

    // ------------------------------
    // Return quote
    // ------------------------------
    res.json({
      success: true,
      breakdown: {
        basePlatformFee: BASE_PLATFORM_FEE_USD,
        users,
        monthlyImages,
        monthlyVideos,
        monthlyMusic,
        gamingAssets,
        customModels,
        supportLevel,
      },
      estimatedMonthlyUSD: Math.round(total),
    });
  } catch (err) {
    console.error("Enterprise quote error:", err);
    res.status(500).json({ success: false, error: "Quote calculation failed" });
  }
});

// ==============================
// STRIPE CHECKOUT (Enterprise)
// ==============================
// POST /api/enterprise/checkout
app.post("/api/enterprise/checkout", async (req, res) => {
  try {
    const { amountUSD, companyName, email } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amountUSD * 100,
            product_data: {
              name: `Mintora Enterprise Platform — ${companyName}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: "https://mintora.ai/success",
      cancel_url: "https://mintora.ai/enterprise",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: "Checkout session failed" });
  }
});

// ==============================
// Start server
// ==============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Mintora backend running on port ${PORT}`);
});
