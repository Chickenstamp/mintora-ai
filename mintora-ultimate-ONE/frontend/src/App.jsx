import React, { useState } from 'react'
import ImageGen from './pages/ImageGen.jsx'
import VideoGen from './pages/VideoGen.jsx'
import Pricing from './pages/Pricing.jsx'

export default function App(){
  const [page, setPage] = useState('image')
  return (
    <div style={{maxWidth:900, margin:'20px auto', fontFamily:'system-ui, sans-serif'}}>
      <h1>Mintora ONE</h1>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <button onClick={()=>setPage('image')}>Image</button>
        <button onClick={()=>setPage('video')}>Video</button>
        <button onClick={()=>setPage('pricing')}>Pricing</button>
      </div>
      {page==='image' && <ImageGen/>}
      {page==='video' && <VideoGen/>}
      {page==='pricing' && <Pricing/>}
    </div>
  )
}
