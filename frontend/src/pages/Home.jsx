// frontend/src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0F] to-[#111827] text-white">

      {/* 🔥 Animated Hero Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 animate-heroGlow opacity-40 pointer-events-none"
             style={{
               background:
                 "radial-gradient(circle at 20% 30%, rgba(255,60,60,0.55), transparent 60%), " +
                 "radial-gradient(circle at 80% 70%, rgba(255,255,255,0.20), transparent 60%)",
             }}
        />

        {/* HERO SECTION */}
        <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            The Future of <span className="text-red-500">AI</span><br />
            <span className="text-red-500">Imaging</span>, Video & Audio
          </h1>

          <p className="text-gray-300 max-w-2xl mt-6 text-lg">
            Mintora Labs transforms simple prompts into cinematic visuals,  
            ultra-fast. Built for creators, brands and pros seeking  
            uncompromising quality.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-10">
            <a
              href="/image"
              className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold shadow-lg shadow-red-500/30"
            >
              Generate Image
            </a>

            <a
              href="/video"
              className="px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition font-semibold"
            >
              Generate Video
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            No credit card required • Commercial-ready • Blazing fast
          </p>
        </section>
      </div>

      {/* ---------------------- */}
      {/* 🔥 CINEMATIC SHOWCASE */}
      {/* ---------------------- */}

      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Cinematic Images</h2>
          <a href="/templates" className="text-gray-300 hover:text-white text-sm">
            See templates →
          </a>
        </div>

        {/* 1st Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {["/media/showcase1.jpg", "/media/showcase2.jpg", "/media/showcase3.jpg"].map(
            (src, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden group relative shadow-xl shadow-black/30"
              >
                <img
                  src={src}
                  alt="Showcase"
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
            )
          )}
        </div>

        {/* 2nd Row (images / videos / audio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Image */}
          <div className="rounded-2xl overflow-hidden group shadow-xl shadow-black/30">
            <img
              src="/media/showcase4.jpg"
              alt="Showcase"
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Video */}
          <div className="rounded-2xl overflow-hidden group shadow-xl shadow-black/30 bg-black">
            <video
              src="/media/hero.mp4"
              autoPlay
              loop
              muted
              className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition duration-700"
            />
          </div>

          {/* Music */}
          <div className="rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-red-600 to-red-800 shadow-xl shadow-red-500/30">
            <p className="text-lg font-semibold mb-3">🎵 AI Music Sample</p>
            <audio controls className="w-full">
              <source src="/media/audio-sample.mp3" type="audio/mpeg" />
            </audio>
          </div>

        </div>
      </section>
    </div>
  );
}
