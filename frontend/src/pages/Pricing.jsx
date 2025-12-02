import React, { useEffect, useState } from 'react'

export default function Pricing(){
  const [pricing, setPricing] = useState(null)
  useEffect(()=>{
    fetch('/config/pricing.json').then(r=>r.json()).then(setPricing).catch(()=>{})
  },[])
  if(!pricing) return <div>Loading pricing…</div>
  return (
    <div>
      <h3>Pricing</h3>
      <h4>Subscriptions</h4>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
        {Object.entries(pricing.subscriptions).map(([code,plan])=>(
          <div key={code} style={{border:'1px solid #ddd',borderRadius:8,padding:12}}>
            <div style={{fontWeight:700}}>{code.replace('_',' ').toUpperCase()}</div>
            <div><b>Monthly</b></div>
            <ul>{Object.entries(plan.monthly).map(([ccy,amt])=> <li key={ccy}>{ccy} {amt.toFixed(2)}</li>)}</ul>
            <div><b>Yearly</b></div>
            <ul>{Object.entries(plan.yearly).map(([ccy,amt])=> <li key={ccy}>{ccy} {amt.toFixed(2)}</li>)}</ul>
          </div>
        ))}
      </div>

      <h4 style={{marginTop:16}}>Credit Packs</h4>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
        {Object.entries(pricing.credit_packs).map(([code,pack])=>(
          <div key={code} style={{border:'1px solid #ddd',borderRadius:8,padding:12}}>
            <div style={{fontWeight:700}}>{code.replace('_',' ').toUpperCase()}</div>
            <ul>{Object.entries(pack.oneoff).map(([ccy,amt])=> <li key={ccy}>{ccy} {amt.toFixed(2)}</li>)}</ul>
          </div>
        ))}
      </div>

      <h4 style={{marginTop:16}}>Feature Credit Costs</h4>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead><tr><th style={{textAlign:'left'}}>Feature</th><th style={{textAlign:'right'}}>Credits</th></tr></thead>
        <tbody>
          {Object.entries(pricing.feature_credit_costs).map(([k,v])=> (
            <tr key={k}>
              <td style={{borderBottom:'1px solid #eee', padding:'6px 0'}}>{k.replace(/_/g,' ')}</td>
              <td style={{borderBottom:'1px solid #eee', textAlign:'right'}}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
