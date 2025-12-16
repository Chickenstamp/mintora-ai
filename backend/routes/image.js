import express from "express";
import Replicate from "replicate";

const router = express.Router();

// Load Replicate API key
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY, // make sure this is in backend/.env
});

// POST /api/image/generate
router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Run the model on Replicate
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt,
        },
      }
    );

    // Replicate returns a URL string (or array). Normalize to url string:
    const url = Array.isArray(output) ? output[0] : output;
    return res.json({ url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;   // 👈 IMPORTANT
