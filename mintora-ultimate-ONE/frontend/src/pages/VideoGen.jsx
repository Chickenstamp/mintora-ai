import React, { useState } from 'react'

export default function VideoGen(){
  const [videoUrl, setVideoUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [outUrl, setOutUrl] = useState('')

  async function merge(){
    const res = await fetch('/api/video/merge-audio-beat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ video_url: videoUrl, audio_url: audioUrl })
    })
    const j = await res.json()
    if(j.video_url) setOutUrl(j.video_url)
    else alert(JSON.stringify(j))
  }

  return (
    <div>
      <h3>Beat-Sync Merge</h3>
      <input value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} placeholder="Video URL" style={{width:'100%'}}/>
      <input value={audioUrl} onChange={e=>setAudioUrl(e.target.value)} placeholder="Audio URL" style={{width:'100%'}}/>
      <button onClick={merge} style={{marginTop:8}}>Merge</button>
      {outUrl && <video controls src={outUrl} style={{width:'100%', marginTop:8}}/>}
    </div>
  )
}
