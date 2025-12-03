import express from 'express'
import { stripe } from '../server.js'
import fs from 'fs'
import path from 'path'
import url from 'url'

const router = express.Router()

function loadPriceIds(){
  const __filename = url.fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const cfgPath = path.join(__dirname, '..', 'config', 'stripe_price_ids.json')
  if(fs.existsSync(cfgPath)){
    return JSON.parse(fs.readFileSync(cfgPath, 'utf-8'))
  }
  return { subscriptions:{}, packs:{}, addons:{} }
}

// Return configured price IDs to frontend (safe to expose price ids)
router.get('/api/checkout/config', async (req,res)=>{
  try{
    const ids = loadPriceIds()
    res.json(ids)
  }catch(e){ res.status(500).json({ error:e.message }) }
})

// Create subscription checkout session
router.post('/api/checkout/subscription', async (req,res)=>{
  try{
    const { price_id, success_url, cancel_url, customer_email } = req.body
    if(!price_id) return res.status(400).json({ error:'price_id required' })
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email,
      line_items:[{ price: price_id, quantity:1 }],
      success_url: success_url || `${process.env.FRONTEND_URL}/success`,
      cancel_url: cancel_url || `${process.env.FRONTEND_URL}/cancel`
    })
    res.json({ id: session.id, url: session.url })
  }catch(e){ res.status(500).json({ error:e.message }) }
})

// Create one-off (payment) checkout session for credit packs / day pass
router.post('/api/checkout/oneoff', async (req,res)=>{
  try{
    const { price_id, success_url, cancel_url, customer_email } = req.body
    if(!price_id) return res.status(400).json({ error:'price_id required' })
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email,
      line_items:[{ price: price_id, quantity:1 }],
      success_url: success_url || `${process.env.FRONTEND_URL}/success`,
      cancel_url: cancel_url || `${process.env.FRONTEND_URL}/cancel`
    })
    res.json({ id: session.id, url: session.url })
  }catch(e){ res.status(500).json({ error:e.message }) }
})

export default router
