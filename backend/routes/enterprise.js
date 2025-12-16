import express from "express";
import Stripe from "stripe";
import PDFDocument from "pdfkit";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const FX = { USD:1, EUR:0.92, GBP:0.79, AUD:1.48, AED:3.67 }; // rough FX; Stripe will localize at checkout

// round down to .49/.79/.99
const psych = (cents) => {
  const dollars = cents / 100;
  // pick nearest psychological ending
  const base = Math.floor(dollars);
  const endings = [0.49, 0.79, 0.99];
  let best = (base + 0.99);
  let minDiff = 1e9;
  endings.forEach(e=>{
    const candidate = base + e;
    const diff = Math.abs(candidate - dollars);
    if (diff < minDiff) { minDiff = diff; best = candidate; }
  });
  return Math.max(best, 0.99) * 100 | 0;
};

// price blocks (USD cents)
const PRICE = {
  BASE: 48999,
  VIDEO_BLOCKS: [
    { label: "1,000 video credits", cents: 17999 },
    { label: "5,000 video credits", cents: 79999 },
    { label: "20,000 video credits", cents: 269999 },
    { label: "100,000 video credits", cents: 1249999 },
  ],
  REALISM: [
    { tokens: 500, cents: 38499 },
    { tokens: 2000, cents: 129999 },
    { tokens: 10000, cents: 479999 },
  ],
  GPU: {
    queue: { label:"Shared queue", cents: 0 },
    a40:   { label:"Dedicated A40 node", cents: 89999 },
    a100:  { label:"Dedicated A100 node", cents: 249999 },
    h100:  { label:"Dedicated H100 node", cents: 499999 },
  },
  TRAINING: {
    none:   { label:"No training", cents: 0 },
    avatar: { label:"Custom avatar", cents: 99999 },
    ft:     { label:"Fine-tuned model", cents: 449999 },
    pipe:   { label:"Dedicated pipeline", cents: 1499999 },
  },
  SLA: {
    standard:   { label:"Standard support", cents: 0 },
    priority:   { label:"Priority 4-hour", cents: 79999 },
    premium247: { label:"24/7 white-glove", cents: 199999 },
  },
  STORAGE_PER_GB: 15, // cents/GB
  MUSIC_ADDON: 0,     // can expand
  GAMING_ADDON: 0,
};

const pickVideoBlock = (monthlyVideos=0) => {
  if (monthlyVideos <= 1000) return PRICE.VIDEO_BLOCKS[0];
  if (monthlyVideos <= 5000) return PRICE.VIDEO_BLOCKS[1];
  if (monthlyVideos <= 20000) return PRICE.VIDEO_BLOCKS[2];
  return PRICE.VIDEO_BLOCKS[3];
};

const realismTokensForLevel = (level="none", monthlyVideos=0) => {
  // rough mapping: tokens ≈ videos (clip lengths averaged)
  if (level === "none") return { tokens:0, cents:0 };
  let need = Math.ceil(monthlyVideos * (level === "standard" ? 0.5 : level === "enhanced" ? 1 : 1.5));
  if (need <= 500) return PRICE.REALISM[0];
  if (need <= 2000) return PRICE.REALISM[1];
  return PRICE.REALISM[2];
};

const toCurrency = (usdCents, currency="USD") => {
  const fx = FX[currency] || 1;
  const converted = Math.round(usdCents * fx);
  return psych(converted); // apply .49/.79/.99
};

// POST /api/enterprise/calc -> returns calculated quote (not stored)
router.post("/calc", async (req, res) => {
  try {
    const {
      company_name, industry, team_size, website, contact_email,
      monthly_videos, max_resolution, realism_level,
      lip_sync, camera_motion, storyboard, branding, languages,
      gpu_tier, custom_avatar, finetune, dataset_gb,
      gaming_assets, music_ai, license_required,
      sso, soc2, support_level, storage_gb,
      billing_cycle, net_terms, currency="USD"
    } = req.body;

    const base = toCurrency(PRICE.BASE, currency);
    const vid = pickVideoBlock(monthly_videos);
    const vidCents = toCurrency(vid.cents, currency);
    const real = realismTokensForLevel(realism_level, monthly_videos);
    const realCents = toCurrency(real.cents, currency);
    const gpu = PRICE.GPU[gpu_tier || "queue"] || PRICE.GPU.queue;
    const gpuCents = toCurrency(gpu.cents, currency);

    let train = PRICE.TRAINING.none;
    if (finetune) train = PRICE.TRAINING.ft;
    else if (custom_avatar) train = PRICE.TRAINING.avatar;
    const trainCents = toCurrency(train.cents, currency);

    const sla = PRICE.SLA[support_level || "standard"] || PRICE.SLA.standard;
    const slaCents = toCurrency(sla.cents, currency);

    const storCents = toCurrency((PRICE.STORAGE_PER_GB * (storage_gb || 50)), currency);
    const musicCents = toCurrency(PRICE.MUSIC_ADDON, currency);
    const gamingCents = toCurrency(PRICE.GAMING_ADDON, currency);

    let total = base + vidCents + realCents + gpuCents + trainCents + slaCents + storCents + musicCents + gamingCents;

    const result = {
      currency,
      line_items: [
        { label:"Base platform fee", cents: base },
        { label: vid.label, cents: vidCents },
        ...(real.tokens ? [{ label:`${real.tokens} realism tokens`, cents: realCents }] : []),
        { label: gpu.label, cents: gpuCents },
        { label: train.label, cents: trainCents },
        { label: sla.label, cents: slaCents },
        { label: `Storage ${storage_gb||50}GB`, cents: storCents },
      ],
      total_cents: total
    };

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "calc_failed" });
  }
});

// POST /api/enterprise/submit -> saves request + quote, generates Stripe Quote, produces PDF URL
router.post("/submit", async (req, res) => {
  try {
    const { form, calc } = req.body; // form = intake answers, calc = result from /calc
    // 1) save request
    const { data: reqIns, error: reqErr } = await supabase
      .from("enterprise_requests")
      .insert([form])
      .select()
      .single();
    if (reqErr) throw reqErr;

    // 2) create Stripe Quote (dynamic)
    const line_items = calc.line_items.map(li => ({
      price_data: {
        currency: (calc.currency || "usd").toLowerCase(),
        product_data: { name: li.label },
        unit_amount: li.cents,
      },
      quantity: 1,
    }));
    const quote = await stripe.quotes.create({
      line_items,
      metadata: { request_id: reqIns.id, type: "enterprise" }
    });

    // 3) generate PDF and upload to Supabase Storage
    const pdfBuffer = await makeQuotePDF(reqIns, calc, quote);
    const filename = `quotes/${reqIns.id}.pdf`;
    const up = await supabase.storage.from(process.env.ENTERPRISE_BUCKET).upload(filename, pdfBuffer, {
      contentType: "application/pdf", upsert: true
    });
    if (up.error) throw up.error;

    // 4) save quote
    const { data: qIns, error: qErr } = await supabase
      .from("enterprise_quotes")
      .insert([{
        request_id: reqIns.id,
        base_fee_cents: calc.line_items[0].cents,
        video_block_label: calc.line_items.find(l=>l.label.includes("credits"))?.label,
        video_block_cents: calc.line_items.find(l=>l.label.includes("credits"))?.cents || 0,
        realism_tokens: Number((calc.line_items.find(l=>l.label.includes("tokens"))?.label||"").split(" ")[0]) || 0,
        realism_block_cents: calc.line_items.find(l=>l.label.includes("tokens"))?.cents || 0,
        gpu_label: calc.line_items.find(l=>l.label.toLowerCase().includes("node")||l.label.toLowerCase().includes("queue"))?.label,
        gpu_cents: calc.line_items.find(l=>l.label.toLowerCase().includes("node")||l.label.toLowerCase().includes("queue"))?.cents || 0,
        training_label: calc.line_items.find(l=>l.label.toLowerCase().includes("avatar")||l.label.toLowerCase().includes("model")||l.label.toLowerCase().includes("pipeline"))?.label,
        training_cents: calc.line_items.find(l=>l.label.toLowerCase().includes("avatar")||l.label.toLowerCase().includes("model")||l.label.toLowerCase().includes("pipeline"))?.cents || 0,
        sla_label: calc.line_items.find(l=>l.label.toLowerCase().includes("support"))?.label,
        sla_cents: calc.line_items.find(l=>l.label.toLowerCase().includes("support"))?.cents || 0,
        storage_gb: form.storage_gb || 50,
        storage_cents: calc.line_items.find(l=>l.label.toLowerCase().includes("storage"))?.cents || 0,
        total_cents: calc.total_cents,
        currency: calc.currency || "USD",
        stripe_quote_id: quote.id,
        pdf_path: filename
      }])
      .select()
      .single();
    if (qErr) throw qErr;

    res.json({ ok:true, request: reqIns, quote: qIns, stripe_quote_url: quote.livemode ? quote.public_url : quote.public_url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error:"submit_failed" });
  }
});

async function makeQuotePDF(reqIns, calc, quote) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.fontSize(20).text("Mintora Labs — Enterprise Quote", { align: "left" });
    doc.moveDown();
    doc.fontSize(12).text(`Company: ${reqIns.company_name}`);
    doc.text(`Contact: ${reqIns.contact_email}`);
    doc.text(`Industry: ${reqIns.industry || '-'}`);
    doc.text(`Team Size: ${reqIns.team_size || '-'}`);
    doc.moveDown();

    doc.fontSize(14).text("Quote Breakdown");
    doc.moveDown(0.5);
    calc.line_items.forEach(li => {
      doc.fontSize(12).text(`${li.label}: ${(li.cents/100).toFixed(2)} ${calc.currency}`);
    });
    doc.moveDown();
    doc.fontSize(14).text(`Total: ${(calc.total_cents/100).toFixed(2)} ${calc.currency}`);
    doc.moveDown(1);
    doc.fontSize(10).text(`Stripe Quote ID: ${quote.id}`);

    doc.end();
  });
}

export default router;
