import React, { useEffect, useState } from 'react';
export default function PricingShowcase(){
  const [cfg,setCfg]=useState(null);
  useEffect(()=>{ fetch('/api/checkout/config').then(r=>r.json()).then(setCfg).catch(()=>{}); },[]);
  const tiers=[
    {key:'starter', name:'Starter', blurb:'Create casually', perks:['Basic T2I/T2V','HD export','Standard queue']},
    {key:'pro_plus', name:'Pro+', blurb:'Creators & marketers', perks:['Fast-pass','1080p/4K','Voice & avatars']},
    {key:'studio', name:'Studio', blurb:'Teams & agencies', perks:['Priority render','4K Pro','API access']},
  ];
  const cur=['USD','AUD','AED','EUR','GBP'];
  return (
    <section className="container pricing">
      <h2 style={{textAlign:'center'}}>Pricing</h2>
      {!cfg ? <div className="card">Loading prices…</div> :
      <div className="grid grid-3">
        {tiers.map(t=>(
          <div className="card price-card" key={t.key}>
            <h3>{t.name}</h3>
            <div className="badge">{t.blurb}</div>
            <div style={{margin:'10px 0'}}>
              <div className="kicker">Monthly</div>
              <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:6}}>
                {cur.map(c=>{
                  const pid = cfg?.subscriptions?.[t.key]?.monthly?.[c] || "";
                  return <button key={c} className="btn" disabled={!pid} onClick={()=>checkout('/api/checkout/subscription', pid)}>{c}</button>
                })}
              </div>
              <div className="kicker" style={{marginTop:8}}>Yearly</div>
              <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:6}}>
                {cur.map(c=>{
                  const pid = cfg?.subscriptions?.[t.key]?.yearly?.[c] || "";
                  return <button key={c} className="btn" disabled={!pid} onClick={()=>checkout('/api/checkout/subscription', pid)}>{c}</button>
                })}
              </div>
            </div>
            <ul className="clean">
              {t.perks.map((p,i)=>(<li className="feature" key={i}><span className="dot"></span><span>{p}</span></li>))}
            </ul>
          </div>
        ))}
      </div>}
    </section>
  );
  async function checkout(url, price_id){
    const r = await fetch(url,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({price_id})});
    const j = await r.json(); if(j?.url) window.location = j.url;
  }
}
