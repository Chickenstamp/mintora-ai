import React from 'react';
export default function FeatureGrid(){
  const feats = [
    { t:"Text-to-Video", d:"Turn ideas into motion with provider-optimized pipelines.", k:["video","t2v"]},
    { t:"Image Studio", d:"Photoreal, stylized, and product visuals with smart upscaler.", k:["image","upscale"]},
    { t:"Beat-Sync", d:"Auto sync your music to cuts and motion for instant rhythm.", k:["audio","beat"]},
    { t:"Voice & Avatars", d:"TTS dubbing and photoreal avatars for talking-heads.", k:["voice","avatar"]},
    { t:"Translate & Subtitles", d:"Auto SRT + translate for global distribution.", k:["subs","translate"]},
    { t:"C2PA Credentials", d:"Verified content provenance for safer publishing.", k:["safety","c2pa"]},
  ];
  return (
    <section className="container">
      <div className="grid grid-3">
        {feats.map((f,i)=>(
          <div className="card" key={i}>
            <div className="badge">{f.k.join(" · ")}</div>
            <h3 style={{marginBottom:6}}>{f.t}</h3>
            <p style={{opacity:.8}}>{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
