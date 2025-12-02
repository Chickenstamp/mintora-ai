// node backend/scripts/create_stripe_products_strategy.js
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function cents(x){ return Math.round((x - 0.01) * 100) }

const subs = [
  { code:'starter', name:'Mintora Starter',
    monthly:{ USD:9.99, AUD:14.99, AED:36.99, EUR:9.49, GBP:8.99 },
    yearly:{  USD:99.99, AUD:149.99, AED:369.99, EUR:94.99, GBP:89.99 } },
  { code:'pro_plus', name:'Mintora Pro+',
    monthly:{ USD:19.99, AUD:29.99, AED:73.99, EUR:18.99, GBP:16.99 },
    yearly:{  USD:199.99, AUD:299.99, AED:739.99, EUR:189.99, GBP:169.99 } },
  { code:'studio', name:'Mintora Studio',
    monthly:{ USD:49.99, AUD:74.99, AED:183.99, EUR:47.99, GBP:41.99 },
    yearly:{  USD:499.99, AUD:749.99, AED:1839.99, EUR:479.99, GBP:419.99 } },
]

const packs = [
  { code:'credits_50',   name:'Mintora Credits 50',   oneoff:{ USD:9.99,  AUD:14.99, AED:36.99,  EUR:9.49,  GBP:8.99 } },
  { code:'credits_100',  name:'Mintora Credits 100',  oneoff:{ USD:17.99, AUD:26.99, AED:66.99,  EUR:16.99, GBP:14.99 } },
  { code:'credits_500',  name:'Mintora Credits 500',  oneoff:{ USD:69.99, AUD:104.99,AED:259.99, EUR:66.99, GBP:59.99 } },
  { code:'credits_1000', name:'Mintora Credits 1000', oneoff:{ USD:119.99,AUD:179.99,AED:449.99, EUR:114.99,GBP:99.99 } },
  { code:'day_pass',     name:'Mintora Day Pass (24h)',oneoff:{ USD:9.99,  AUD:14.99, AED:36.99,  EUR:9.49,  GBP:8.99 } },
]

async function ensureProduct(name, metadata={}){
  const found = await stripe.products.search({ query: `active:'true' AND name:'${name.replace(/'/g,"\'")}'` })
  if(found.data.length) return found.data[0]
  return await stripe.products.create({ name, metadata })
}

async function createRecurringPrices(product, map, interval){
  const ids = {}
  for(const [ccy, amt] of Object.entries(map)){
    const p = await stripe.prices.create({ unit_amount: cents(amt), currency: ccy.toLowerCase(), recurring: { interval }, product: product.id })
    ids[ccy] = p.id
  }
  return ids
}

async function createOneoffPrices(product, map){
  const ids = {}
  for(const [ccy, amt] of Object.entries(map)){
    const p = await stripe.prices.create({ unit_amount: cents(amt), currency: ccy.toLowerCase(), product: product.id })
    ids[ccy] = p.id
  }
  return ids
}

async function main(){
  const out = { products:{} }
  for(const s of subs){
    const prod = await ensureProduct(s.name, { code:s.code })
    const monthly = await createRecurringPrices(prod, s.monthly, 'month')
    const yearly  = await createRecurringPrices(prod, s.yearly, 'year')
    out.products[s.code] = { product_id: prod.id, monthly, yearly }
  }
  for(const pack of packs){
    const prod = await ensureProduct(pack.name, { code: pack.code })
    const oneoff = await createOneoffPrices(prod, pack.oneoff)
    out.products[pack.code] = { product_id: prod.id, oneoff }
  }
  console.log(JSON.stringify(out, null, 2))
}
main().catch(e=>{ console.error(e); process.exit(1) })
