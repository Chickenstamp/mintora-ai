import React, { useEffect, useState } from 'react';
import data from '../support/templates.json';
import '../theme/mintora.css';

export default function Templates(){
  const [list, setList] = useState([]);
  useEffect(()=>{ setList(data.templates||[]); },[]);
  return (
    <div className="container">
      <h1>Templates</h1>
      <div className="grid grid-3">
        {list.map(t => (
          <div className="card" key={t.slug}>
            <div className="badge">{t.type}</div>
            <h3>{t.title}</h3>
            <div style={{opacity:.8, fontSize:13, margin:'6px 0'}}>Default settings </div>
            <pre style={{whiteSpace:'pre-wrap', background:'rgba(0,0,0,.25)', padding:10, borderRadius:8}}>{JSON.stringify(t.defaults,null,2)}</pre>
            <div className="kicker">Credits: {t.credits}</div>
            <div style={{marginTop:10}}>
              <a className="btn btn-primary" href={`/create?template=${t.slug}`}>Use template</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
