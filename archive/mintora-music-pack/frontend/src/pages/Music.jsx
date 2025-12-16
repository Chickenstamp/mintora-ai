import React, { useState, useRef } from "react";

const API = import.meta.env.VITE_BACKEND_URL;

export default function Music() {
  const [prompt, setPrompt] = useState("uplifting cinematic electronic, shimmering pads, warm bass, crisp drums");
  const [genre, setGenre] = useState("electronic");
  const [mood, setMood] = useState("uplifting");
  const [bpm, setBpm] = useState(110);
  const [duration, setDuration] = useState(45);
  const [loop, setLoop] = useState(true);
  const [audioURL, setAudioURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const audioRef = useRef(null);

  async function generate() {
    setLoading(true); setErr(""); setAudioURL("");
    try {
      const resp = await fetch(`${API}/api/music/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, genre, mood, bpm: Number(bpm), duration: Number(duration), loop })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to generate");
      setAudioURL(data.url);
      setTimeout(()=> audioRef.current?.load(), 50);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  const download = () => {
    if (!audioURL) return;
    const a = document.createElement("a");
    a.href = audioURL;
    a.download = "mintora-track.mp3";
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold">AI Music Generator</h2>
      <p className="text-white/70 mt-2">Create loops and short tracks for videos and games. Genres, moods, BPM and duration supported.</p>

      <div className="mt-6 bg-[#1C1F26] p-6 rounded-2xl border border-white/10">
        <label className="block text-sm font-medium">Prompt / Style</label>
        <input className="w-full bg-[#0C0F14] border border-white/10 rounded-xl p-3"
               value={prompt} onChange={e=>setPrompt(e.target.value)} />

        <div className="grid md:grid-cols-4 gap-3 mt-4">
          <div>
            <label className="block text-sm font-medium">Genre</label>
            <select className="w-full bg-[#0C0F14] border border-white/10 rounded-xl p-3"
                    value={genre} onChange={e=>setGenre(e.target.value)}>
              <option>electronic</option>
              <option>hip-hop</option>
              <option>pop</option>
              <option>orchestral</option>
              <option>ambient</option>
              <option>lofi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Mood</label>
            <select className="w-full bg-[#0C0F14] border border-white/10 rounded-xl p-3"
                    value={mood} onChange={e=>setMood(e.target.value)}>
              <option>uplifting</option>
              <option>dark</option>
              <option>dramatic</option>
              <option>relaxed</option>
              <option>epic</option>
              <option>mysterious</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">BPM</label>
            <input type="number" min="60" max="180"
                   className="w-full bg-[#0C0F14] border border-white/10 rounded-xl p-3"
                   value={bpm} onChange={e=>setBpm(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Duration (sec)</label>
            <select className="w-full bg-[#0C0F14] border border-white/10 rounded-xl p-3"
                    value={duration} onChange={e=>setDuration(e.target.value)}>
              <option>15</option><option>30</option><option>45</option><option>60</option><option>90</option>
            </select>
          </div>
        </div>

        <label className="inline-flex items-center gap-2 mt-4 text-white/80">
          <input type="checkbox" checked={loop} onChange={e=>setLoop(e.target.checked)} />
          Loop-friendly ending
        </label>

        <button onClick={generate} disabled={loading}
                className="w-full mt-4 bg-[#E32727] hover:bg-red-600 rounded-xl p-4 text-lg font-semibold disabled:opacity-60">
          {loading ? "Generating..." : "Generate Track"}
        </button>
        {err && <p className="text-red-400 mt-3">{err}</p>}
      </div>

      <div className="mt-6 bg-[#1C1F26] p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold">Preview</h3>
        {audioURL ? (
          <div className="mt-3">
            <audio ref={audioRef} controls src={audioURL} className="w-full">
              Your browser does not support the audio element.
            </audio>
            <div className="mt-3 flex gap-3">
              <button onClick={download} className="px-4 py-2 rounded-xl border border-white/20">Download MP3</button>
              <a href={audioURL} target="_blank" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">Open raw file</a>
            </div>
          </div>
        ) : (
          <p className="text-white/60 mt-2">Your track will appear here after generation.</p>
        )}
      </div>

      <p className="text-white/50 text-sm mt-4">
        Commercial rights depend on your plan. See <a href="/legal/license" className="underline">Game Asset License</a> and Terms.
      </p>
    </div>
  );
}
