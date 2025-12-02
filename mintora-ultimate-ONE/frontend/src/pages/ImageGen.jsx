import React, { useState } from 'react'

export default function ImageGen(){
  const [prompt, setPrompt] = useState('')
  const [url, setUrl] = useState('')

  async function generate(){
    // This demo calls OpenAI image edits endpoint via backend (not included here for brevity).
    alert('Hook this to your /api/image/generate endpoint if present in your backend.')
  }

  return (
    <div>
      <h3>Generate Image</h3>
      <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="product photo, cinematic, 50mm" style={{width:'100%'}}/>
      <button onClick={generate} style={{marginTop:8}}>Generate</button>
      {url && <div><img src={url} alt="result" style={{maxWidth:'100%'}}/></div>}
    </div>
  )
}
