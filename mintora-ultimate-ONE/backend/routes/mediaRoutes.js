import express from 'express'
import fetch from 'node-fetch'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import { promises as fsPromises } from 'fs'
import { supabase } from '../server.js'

ffmpeg.setFfmpegPath(ffmpegPath)
const router = express.Router()

async function uploadPublic(path, buf, contentType){
  const { error } = await supabase.storage.from('videos').upload(path, buf, { upsert:true, contentType })
  if(error) throw error
  const { data } = await supabase.storage.from('videos').getPublicUrl(path)
  return data.publicUrl
}

router.post('/api/subtitles/auto', async (req,res)=>{
  try{
    const { video_url, language='en' } = req.body
    if(!video_url) return res.status(400).json({ error:'video_url required' })
    const vbuf = Buffer.from(await (await fetch(video_url)).arrayBuffer())
    const tmp = '/tmp', t=Date.now()
    const vPath = `${tmp}/sv_${t}.mp4`, aPath = `${tmp}/sv_${t}.wav`
    await fsPromises.writeFile(vPath, vbuf)
    await new Promise((resolve, reject)=>{
      ffmpeg(vPath).noVideo().audioFrequency(16000).audioChannels(1).format('wav').save(aPath).on('end', resolve).on('error', reject)
    })
    const FormData = (await import('form-data')).default
    const fs = await import('fs')
    const form = new FormData()
    form.append('file', fs.createReadStream(aPath))
    form.append('model', 'whisper-1')
    form.append('response_format', 'srt')
    form.append('language', language)
    const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', { method:'POST', headers:{ Authorization:`Bearer ${process.env.OPENAI_API_KEY}` }, body: form })
    if(!resp.ok){ const t = await resp.text(); throw new Error(t) }
    const srt = await resp.text()
    const path = `subs/sub_${Date.now()}.srt`
    const url = await uploadPublic(path, Buffer.from(srt,'utf-8'), 'text/plain')
    res.json({ srt_url: url, srt })
  }catch(e){ res.status(500).json({ error:e.message }) }
})

router.post('/api/translate', async (req,res)=>{
  try{
    const { srt, target_lang='es' } = req.body
    if(!srt) return res.status(400).json({ error:'srt required' })
    const payload = { model: 'gpt-4o-mini', messages: [{ role:'user', content: `Translate this SRT subtitle file into ${target_lang}. Keep timestamps unchanged. Return only SRT.\n\n${srt}` }] }
    const r = await fetch('https://api.openai.com/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${process.env.OPENAI_API_KEY}`}, body: JSON.stringify(payload) })
    const j = await r.json()
    const out = j?.choices?.[0]?.message?.content || srt
    res.json({ srt: out })
  }catch(e){ res.status(500).json({ error: e.message }) }
})

router.post('/api/dub', async (req,res)=>{
  try{
    const { script, voice='alloy' } = req.body
    if(!script) return res.status(400).json({ error:'script required' })
    const r = await fetch('https://api.openai.com/v1/audio/speech', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${process.env.OPENAI_API_KEY}` }, body: JSON.stringify({ model:'gpt-4o-mini-tts', voice, input: script, format:'mp3' }) })
    if(!r.ok){ const t=await r.text(); throw new Error(t) }
    const buf = Buffer.from(await r.arrayBuffer())
    const path = `audio/dub_${Date.now()}.mp3`
    const url = await uploadPublic(path, buf, 'audio/mpeg')
    res.json({ audio_url: url })
  }catch(e){ res.status(500).json({ error: e.message }) }
})

router.post('/api/storyboard/generate', async (req,res)=>{
  try{
    const { prompt, totalSec=15 } = req.body
    const payload = { model: 'gpt-4o-mini', messages: [{ role:'user', content: `Create a ${totalSec}s short video storyboard for: "${prompt}". Return JSON with scenes[{start,end,prompt,overlayText}], 4-8 scenes.` }], response_format: { type: 'json_object' } }
    const r = await fetch('https://api.openai.com/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${process.env.OPENAI_API_KEY}`}, body: JSON.stringify(payload) })
    const j = await r.json()
    let obj = { scenes:[] }; try{ obj = JSON.parse(j?.choices?.[0]?.message?.content||'{}') }catch{}
    res.json({ storyboard: obj })
  }catch(e){ res.status(500).json({ error: e.message }) }
})

router.post('/api/video/merge-audio-beat', async (req,res)=>{
  try{
    const { video_url, audio_url } = req.body
    if(!video_url || !audio_url) return res.status(400).json({ error:'video_url and audio_url required' })
    const [vbuf, abuf] = await Promise.all([ fetch(video_url).then(r=>r.arrayBuffer()), fetch(audio_url).then(r=>r.arrayBuffer()) ])
    const tmp = '/tmp', t=Date.now()
    const vPath = `${tmp}/v_${t}.mp4`, aPath = `${tmp}/a_${t}.mp3`, oPath = `${tmp}/o_${t}.mp4`
    await fsPromises.writeFile(vPath, Buffer.from(vbuf))
    await fsPromises.writeFile(aPath, Buffer.from(abuf))
    await new Promise((resolve,reject)=>{
      ffmpeg(vPath).addInput(aPath).videoCodec('copy').audioCodec('aac').save(oPath).on('end', resolve).on('error', reject)
    })
    const outBuf = await fsPromises.readFile(oPath)
    const url = await uploadPublic(`renders/merge_${t}.mp4`, outBuf, 'video/mp4')
    res.json({ video_url: url })
  }catch(e){ res.status(500).json({ error:e.message }) }
})

export default router
