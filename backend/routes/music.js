import express from "express";
import Replicate from "replicate";

const router = express.Router();
const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY });

/**
 * POST /api/music/generate
 * body: { prompt, genre, mood, bpm, duration, loop }
 * returns: { url }
 */
router.post("/generate", async (req, res) => {
  try {
    const { prompt = "", genre = "electronic", mood = "uplifting", bpm = 110, duration = 45, loop = true } = req.body || {};

    const musicPrompt = [
      prompt,
      `genre: ${genre}`,
      `mood: ${mood}`,
      `bpm: ${bpm}`,
      loop ? "loopable ending" : "",
      `${duration}s length`
    ].filter(Boolean).join(", ");

    // Replace with the music-capable model slug you have on Replicate
    const output = await replicate.run("meta/musicgen:latest", {
      input: {
        prompt: musicPrompt,
        duration: Math.min(Math.max(duration, 5), 120)
      }
    });

    const url = Array.isArray(output) ? output[0] : output;
    if (!url) return res.status(500).json({ error: "No audio URL returned from provider" });
    return res.json({ url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
