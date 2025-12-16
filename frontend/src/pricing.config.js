// frontend/src/pricing.config.js
// All prices include .99 convention visually via formatPrice(). Keep numeric bases below.
// Yearly is already ~20% off vs monthly.

const USD = {
  monthly: { starter: 12.99, pro: 29.99, studio: 79.99 },
  yearly:  { starter: 9.99,  pro: 24.99, studio: 66.99 },
};

const RATES = {
  USD: 1,
  AUD: 1.48,
  AED: 3.67,
  EUR: 0.92,
  GBP: 0.79,
};

// Helper to convert and round down to whole, .99 shown by formatter
function conv(base, rate) {
  return Math.max(1, Math.floor(base * rate)); // keep integer; .99 added by formatter
}

function tierPrices(base, rate) {
  return {
    monthly: {
      USD: Math.floor(base.monthly) + 0.99,
      AUD: conv(base.monthly, RATES.AUD) + 0.99,
      AED: conv(base.monthly, RATES.AED) + 0.99,
      EUR: conv(base.monthly, RATES.EUR) + 0.99,
      GBP: conv(base.monthly, RATES.GBP) + 0.99,
    },
    yearly: {
      USD: Math.floor(base.yearly) + 0.99,
      AUD: conv(base.yearly, RATES.AUD) + 0.99,
      AED: conv(base.yearly, RATES.AED) + 0.99,
      EUR: conv(base.yearly, RATES.EUR) + 0.99,
      GBP: conv(base.yearly, RATES.GBP) + 0.99,
    },
  };
}

const subscriptions = {
  starter: tierPrices({ monthly: USD.monthly.starter, yearly: USD.yearly.starter }),
  pro:     tierPrices({ monthly: USD.monthly.pro,     yearly: USD.yearly.pro     }),
  studio:  tierPrices({ monthly: USD.monthly.studio,  yearly: USD.yearly.studio  }),
};

// Recommended single-use packs (credits never expire)
const basePacksUSD = [
  { id: "mini",    name: "Mini Pack",     credits: 50,   price:  6.99, note: "50 images or ~10 short videos" },
  { id: "creator", name: "Creator Pack",  credits: 150,  price: 14.99, note: "150 images or ~30 short videos" },
  { id: "studio",  name: "Studio Pack",   credits: 350,  price: 29.99, note: "350 images or ~70 short videos" },
  { id: "pro",     name: "PRO Render",    credits: 600,  price: 49.99, note: "600 images or ~120 short videos" },
  { id: "ultra",   name: "Ultra Pack",    credits: 1500, price: 99.99, note: "1500 images or ~300 short videos" },
];

// expand to currencies
function packPricesUSDToAll(p) {
  return {
    ...p,
    prices: {
      USD: p.price,
      AUD: conv(p.price, RATES.AUD) + 0.99,
      AED: conv(p.price, RATES.AED) + 0.99,
      EUR: conv(p.price, RATES.EUR) + 0.99,
      GBP: conv(p.price, RATES.GBP) + 0.99,
    },
  };
}

const singleUse = {
  packs: basePacksUSD.map(packPricesUSDToAll),
};

const PRICING = { subscriptions, singleUse };
export default PRICING;
