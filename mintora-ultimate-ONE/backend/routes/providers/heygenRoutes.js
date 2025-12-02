import express from 'express'
import fetch from 'node-fetch'
const router = express.Router()

router.post('/api/providers/heygen/avatar/render', async (req,res)=>{
  try{
    const { script, voice_id='alloy', avatar_id='default' } = req.body
    const r = await fetch('https://api.heygen.com/v1/video.generate', {
      method:'POST',
      headers:{ 'x-api-key': process.env.HEYGEN_API_KEY, 'Content-Type':'application/json' },
      body: JSON.stringify({ script, voice_id, avatar_id })
    })
    const j = await r.json()
    if(!r.ok) return res.status(500).json({ error: j })
    res.json({ job_id: j.data?.video_id || j.video_id || j.id })
  }catch(e){ res.status(500).json({ error:e.message }) }
})

router.get('/api/providers/heygen/avatar/status', async (req,res)=>{
  try{
    const id = req.query.id
    const r = await fetch(`https://api.heygen.com/v1/video.status?video_id=${encodeURIComponent(id)}`, { headers:{ 'x-api-key': process.env.HEYGEN_API_KEY } })
    const j = await r.json()
    if(!r.ok) return res.status(500).json({ error:j })
    res.json(j)
  }catch(e){ res.status(500).json({ error:e.message }) }
})

export default router
