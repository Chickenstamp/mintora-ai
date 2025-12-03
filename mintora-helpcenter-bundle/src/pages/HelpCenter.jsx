import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import hcData from "../support/articles.json";

export default function HelpCenter() {
  const [q, setQ] = useState("");
  const all = hcData.articles;
  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    if(!s) return all;
    return all.filter(a => 
      a.title.toLowerCase().includes(s) ||
      a.category.toLowerCase().includes(s) ||
      a.keywords.join(" ").toLowerCase().includes(s) ||
      a.body_html.toLowerCase().includes(s)
    );
  }, [q, all]);

  const categories = Array.from(new Set(all.map(a => a.category)));

  return (
    <div style={maxWidth: 980, margin: "24px auto", fontFamily: "system-ui, sans-serif"}>
      <h1>Help Center</h1>
      <p>Find answers fast or contact us below. Updated 2025-12-03.</p>

      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search: billing, credits, video, images…"
        style={width:"100%", padding: 12, borderRadius: 8, border:"1px solid #ddd"}
      />

      <div style={display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap: 12, marginTop: 16}>
        {categories.map(cat => (
          <div key={cat} style={border:"1px solid #eee", borderRadius:12, padding:14}>
            <b>{cat}</b>
            <ul style={marginTop:8}>
              {all.filter(a => a.category===cat).slice(0,5).map(a => (
                <li key={a.slug}><Link to={`/help/${a.slug}`}>{a.title}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 style={marginTop: 24}>Top Results</h2>
      <div style={display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap: 12}>
        {filtered.slice(0,8).map(a => (
          <div key={a.slug} style={border:"1px solid #eee", padding:12, borderRadius:12}>
            <b><Link to={`/help/${a.slug}`}>{a.title}</Link></b>
            <div style={opacity:.7, fontSize:13}>{a.category}</div>
            <p>{a.excerpt}</p>
          </div>
        ))}
      </div>

      <h2 style={marginTop: 28}>Still need help?</h2>
      <p>Send us a message and we’ll respond by email.</p>
      <Link to="/help/contact" style={display:"inline-block", padding:"10px 14px", borderRadius:8, border:"1px solid #ddd"}>Contact Support</Link>
    </div>
  );
}
