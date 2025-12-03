import React, { useEffect, useState } from 'react'

export default function Checkout(){
  const [cfg, setCfg] = useState(null)
  const [email, setEmail] = useState('')

  useEffect(()=>{
    fetch('/api/checkout/config').then(r=>r.json()).then(setCfg).catch(()=>{})
  },[])

  async function go(url, body){
    const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    const j = await r.json()
    if(j.url) window.location.href = j.url
    else alert(JSON.stringify(j))
  }

  if(!cfg) return <div>Loading checkout…</div>
  const currencies = ['USD','AUD','AED','EUR','GBP']

  return (
    <div>
      <h2>Subscribe</h2>
      <input placeholder="email (optional)" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%'}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12, marginTop:8}}>
        {Object.entries(cfg.subscriptions||{}).map(([plan, tiers])=> (
          <div key={plan} style={{border:'1px solid #eee', borderRadius:8, padding:12}}>
            <b>{plan.replace('_',' ').toUpperCase()}</b>
            <div style={{marginTop:8}}><i>Monthly</i></div>
            {currencies.map(ccy=>{
              const pid = tiers?.monthly?.[ccy] || ''
              return <button key={ccy} disabled={!pid} onClick={()=>go('/api/checkout/subscription',{ price_id: pid, customer_email: email })} style={{marginRight:6, marginTop:6}}>{ccy} Monthly</button>
            })}
            <div style={{marginTop:8}}><i>Yearly</i></div>
            {currencies.map(ccy=>{
              const pid = tiers?.yearly?.[ccy] || ''
              return <button key={ccy} disabled={!pid} onClick={()=>go('/api/checkout/subscription',{ price_id: pid, customer_email: email })} style={{marginRight:6, marginTop:6}}>{ccy} Yearly</button>
            })}
          </div>
        ))}
      </div>

      <h2 style={{marginTop:18}}>Credit Packs & Add-ons</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12, marginTop:8}}>
        {Object.entries(cfg.packs||{}).map(([pack, m])=> (
          <div key={pack} style={{border:'1px solid #eee', borderRadius:8, padding:12}}>
            <b>{pack.replace('_',' ').toUpperCase()}</b><br/>
            {currencies.map(ccy=>{
              const pid = m?.oneoff?.[ccy] || ''
              return <button key={ccy} disabled={!pid} onClick={()=>go('/api/checkout/oneoff',{ price_id: pid, customer_email: email })} style={{marginRight:6, marginTop:6}}>{ccy}</button>
            })}
          </div>
        ))}
        {Object.entries(cfg.addons||{}).map(([addon, m])=> (
          <div key={addon} style={{border:'1px solid #eee', borderRadius:8, padding:12}}>
            <b>{addon.replace('_',' ').toUpperCase()}</b><br/>
            {currencies.map(ccy=>{
              const pid = m?.oneoff?.[ccy] || ''
              return <button key={ccy} disabled={!pid} onClick={()=>go('/api/checkout/oneoff',{ price_id: pid, customer_email: email })} style={{marginRight:6, marginTop:6}}>{ccy}</button>
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
