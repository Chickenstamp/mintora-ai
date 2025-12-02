import express from 'express'
import fetch from 'node-fetch'
const router = express.Router()

router.post('/api/providers/eleven/speak', async (req,res)=>{
  try{
    const { text, voice_id='21m00Tcm4TlvDq8ikWAM' } = req.body
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
      method:'POST',
      headers:{ 'xi-api-key': process.env.ELEVEN_API_KEY, 'Content-Type':'application/json' },
      body: JSON.stringify({ text, model_id:'eleven_multilingual_v2', voice_settings:{ stability:0.5, similarity_boost:0.8 } })
    })
    if(!r.ok){ const t = await r.text(); return res.status(500).json({ error:t }) }
    const buf = Buffer.from(await r.arrayBuffer())
    res.setHeader('Content-Type','audio/mpeg')
    return res.send(buf)
  }catch(e){ res.status(500).json({ error:e.message }) }
})

router.post('/api/providers/eleven/voices/create', async (req,res)=>{
  res.json({ note:'Implement ElevenLabs Voice Lab create/import here if needed.', docs:'https://docs.elevenlabs.io' })
})

export default router
