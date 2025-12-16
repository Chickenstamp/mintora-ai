import React from "react";
import { Link } from "react-router-dom";

/**
 * Tip: swap these URLs for your own CDN later.
 * Keep a mix of imgs & short mp4s for motion + color.
 */
const row1 = [
  { t: "img", s: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600", to: "/image" },
  { t: "vid", s: "https://cdn.pixabay.com/vimeo/334315644/ai-wave-22237.mp4?width=1280", to: "/video" },
  { t: "img", s: "https://images.unsplash.com/photo-1520975922284-5f1d1a86b82f?w=1600", to: "/image" },
  { t: "img", s: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600", to: "/music" },
  { t: "vid", s: "https://cdn.pixabay.com/vimeo/275823066/ai-robot-14085.mp4?width=1280", to: "/video" },
  { t: "img", s: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1600", to: "/gaming" },
];

const row2 = [
  { t: "img", s: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600", to: "/image" },
  { t: "vid", s: "https://cdn.pixabay.com/vimeo/210542232/fantasy-13303.mp4?width=1280", to: "/video" },
  { t: "img", s: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1600", to: "/image" },
  { t: "img", s: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1600", to: "/music" },
  { t: "vid", s: "https://cdn.pixabay.com/vimeo/219767561/galaxy-12768.mp4?width=1280", to: "/video" },
  { t: "img", s: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1600", to: "/gaming" },
];

function Tile({ item, w = 360, h = 220, color }) {
  return (
    <Link
      to={item.to}
      className="block rounded-2xl overflow-hidden hover:scale-[1.01] transition will-change-transform"
      style={{
        width: w,
        minWidth: w,
        height: h,
        boxShadow:
          "0 10px 30px -12px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.08)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
      }}
    >
      <div
        className="h-full w-full"
        style={{
          position: "relative",
          background: `linear-gradient(120deg, ${color}22, transparent 60%)`,
        }}
      >
        {item.t === "img" ? (
          <img src={item.s} className="w-full h-full object-cover" />
        ) : (
          <video
            src={item.s}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </Link>
  );
}

export default function ShowcaseStrip() {
  // duplicate for seamless loop
  const a = [...row1, ...row1];
  const b = [...row2, ...row2];

  // vivid Apple-like accents
  const accents = ["#E93B3B", "#4DDCFF", "#FFD43B", "#8B5CF6", "#22D3EE", "#FF6F91"];

  return (
    <div className="relative overflow-hidden bg-black">
      {/* top/btm fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent" />

      {/* Row 1 (left) */}
      <div className="mask-edge">
        <div className="marquee-left gap-4 py-6">
          {a.map((it, i) => (
            <Tile
              key={`r1-${i}`}
              item={it}
              color={accents[i % accents.length]}
            />
          ))}
        </div>
      </div>

      {/* Row 2 (right, slower for parallax feel) */}
      <div className="mask-edge">
        <div className="marquee-right gap-4 pb-8 -mt-4">
          {b.map((it, i) => (
            <Tile
              key={`r2-${i}`}
              item={it}
              color={accents[(i + 3) % accents.length]}
              w={320}
              h={200}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
