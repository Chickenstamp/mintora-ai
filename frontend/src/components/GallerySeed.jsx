import React, { useEffect, useState } from 'react';
import data from '../support/gallery.json';
export default function GallerySeed(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ setItems(data.items||[]); },[]);
  return (
    <section className="container">
      <h2>Gallery</h2>
      <div className="grid grid-4 gallery-grid">
        {items.map((it,i)=>(
          <figure key={i} className="card" style={{padding:8}}>
            <img src={it.thumb} alt={it.title} />
            <figcaption style={{marginTop:8}}>
              <div style={{fontWeight:700}}>{it.title}</div>
              <div style={{opacity:.7, fontSize:12}}>{it.tags.join(' · ')}</div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p style={{opacity:.8, marginTop:12}}>Tip: replace thumbnails and media URLs in <code>frontend/src/support/gallery.json</code> with your Supabase file URLs.</p>
    </section>
  )
}
