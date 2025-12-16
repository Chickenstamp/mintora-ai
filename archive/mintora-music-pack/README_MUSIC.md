# Mintora Music Generator Pack — Drop-in Upgrade

This pack adds a **premium AI Music Generator** to Mintora, updates navigation, and patches the Pricing page with music features and add-ons.

## What’s inside
- `frontend/src/pages/Music.jsx` — full UI to generate, preview and download tracks
- `frontend/src/components/AudioPlayer.jsx` — optional audio component (basic placeholder)
- `frontend/src/components/Navbar.jsx` — REPLACE to add **Music** nav item
- `frontend/src/App.jsx` — REPLACE to add **/music** route
- `frontend/src/pages/Pricing.jsx` — REPLACE to include music features & add-ons
- `backend/routes/music.js` — NEW music generation route (Replicate MusicGen)
- `README_MUSIC.md` — this file

## Exact actions

### Frontend
1) **REPLACE** file: `frontend/src/App.jsx` with the provided one.
2) **REPLACE** file: `frontend/src/components/Navbar.jsx`.
3) **ADD** new file: `frontend/src/pages/Music.jsx`.
4) **ADD** (optional) file: `frontend/src/components/AudioPlayer.jsx`.
5) **REPLACE** file: `frontend/src/pages/Pricing.jsx` (adds music features and add-ons).
6) Ensure your logo at `frontend/public/logo.png` exists.

### Backend
1) **ADD** new file: `backend/routes/music.js`.
2) **EDIT** `backend/server.js`: add
   ```js
   import musicRoutes from "./routes/music.js";
   app.use("/api/music", musicRoutes);
   ```
3) Ensure `.env` contains: `REPLICATE_API_KEY=...` (and you have a music-capable model enabled).

## Env
- Frontend: `VITE_BACKEND_URL=https://your-backend-host` (or `http://localhost:10000` locally)
- Backend: `REPLICATE_API_KEY=your_key_here`

## Test locally
```bash
# backend
cd backend
npm i
npm start

# frontend (new terminal)
cd frontend
npm i
npm run dev
```

Go to `http://localhost:5173/music` and generate your first track.

## Notes
- The route uses a placeholder model slug: `meta/musicgen:latest`. Replace it with the music model you have on Replicate (or your preferred provider).
- Returned URL is expected to be an MP3 or WAV. The UI offers download and preview.
- Licensing notice: the UI references your Game Asset License page for commercial rights.
