import express from 'express'
import Replicate from 'replicate'

const router = express.Router()
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

// Text-to-Video (configure model via env)
router.post('/api/providers/replicate/t2v/render', async (req,res)=>{
  try{
    const { prompt, durationSec=5, resolution='1024x576', guidance=7.5 } = req.body
    const owner = process.env.REPLICATE_T2V_OWNER || 'pika'
    const name  = process.env.REPLICATE_T2V_NAME  || 't2v'
    const ver   = process.env.REPLICATE_T2V_VERSION || ''
    const model = ver ? `${owner}/${name}:${ver}` : `${owner}/${name}`
    const out = await replicate.run(model, { input:{ prompt, duration: durationSec, guidance, resolution } })
    const url = Array.isArray(out?.output) ? out.output[0] : out?.output || out
    res.json({ video_url: url, model })
  }catch(e){ res.status(500).json({ error:e.message }) }
})

router.post('/api/providers/replicate/faceswap', async (req,res)=>{
  try{
    const { source_face_url, target_video_url } = req.body
    const owner = process.env.REPLICATE_FACESWAP_OWNER || 'tomas'
    const name  = process.env.REPLICATE_FACESWAP_NAME  || 'faceswap'
    const ver   = process.env.REPLICATE_FACESWAP_VERSION || ''
    const model = ver ? `${owner}/${name}:${ver}` : `${owner}/${name}`
    const out = await replicate.run(model, { input:{ face: source_face_url, video: target_video_url } })
    const url = Array.isArray(out?.output) ? out.output[0] : out?.output || out
    res.json({ output_url: url, model })
  }catch(e){ res.status(500).json({ error:e.message }) }
})

router.post('/api/providers/replicate/upscale', async (req,res)=>{
  try{
    const { image_url, scale='4x' } = req.body
    const owner = process.env.REPLICATE_UPSCALE_OWNER || 'sczhou'
    const name  = process.env.REPLICATE_UPSCALE_NAME  || 'real-esrgan'
    const ver   = process.env.REPLICATE_UPSCALE_VERSION || ''
    const model = ver ? `${owner}/${name}:${ver}` : `${owner}/${name}`
    const out = await replicate.run(model, { input:{ image: image_url, scale } })
    const url = Array.isArray(out?.output) ? out.output[0] : out?.output || out
    res.json({ upscaled_url: url, model })
  }catch(e){ res.status(500).json({ error:e.message }) }
})

export default router
