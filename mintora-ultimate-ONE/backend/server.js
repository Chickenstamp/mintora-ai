import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import mediaRoutes from "./routes/mediaRoutes.js";
import replicateProviders from "./routes/providers/replicateRoutes.js";
import elevenProviders from "./routes/providers/elevenRoutes.js";
import heygenProviders from "./routes/providers/heygenRoutes.js";

const app = express();
app.use(cors({ origin: "*"}));
app.use(express.json({ limit: "25mb" }));
app.use(morgan("tiny"));
app.use(rateLimit({ windowMs: 60*1000, max: 120 }));

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2023-10-16" });

app.get("/api/health", (req,res)=> res.json({ ok:true, time: new Date().toISOString() }));

app.use("/", mediaRoutes);
app.use("/", replicateProviders);
app.use("/", elevenProviders);
app.use("/", heygenProviders);

// simple checkout demo route (you may replace with your flow)
app.post("/api/checkout/session", async (req,res)=>{
  try{
    const { price_id, success_url, cancel_url } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items:[{ price: price_id, quantity:1 }],
      success_url, cancel_url
    });
    res.json({ id: session.id, url: session.url });
  }catch(e){ res.status(500).json({ error: e.message }) }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log("Backend listening on", PORT));
