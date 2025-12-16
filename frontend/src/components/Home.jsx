// frontend/src/pages/Home.jsx
import React from "react";
import Testimonials from "../components/Testimonials.jsx";

export default function Home() {
  return (
    <div className="bg-white text-neutral-900">

      {/* ================================
          1) HERO (Cinematic Splash)
      ================================= */}
      <section className="
        relative overflow-hidden pt-28 pb-24 
        bg-white
        [background:radial-gradient(900px_500px_at_0%_0%,rgba(255,59,48,.12)_0%,rgba(255,59,48,0)_60%),radial-gradient(900px_500px_at_100%_20%,rgba(87,148,255,.12)_0%,rgba(87,148,255,0)_55%)]
      ">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="
              text-5xl md:text-6xl font-extrabold tracking-tight 
              bg-clip-text text-transparent 
              bg-gradient-to-r from-[#FF3B30] via-[#FF6B5C] to-[#FF3B30]
            ">
              Create Beyond Imagination
            </h1>
            <p className="mt-4 text-lg md:text-xl text-neutral-700">
              Images. Video. Music. Gaming assets.  
              All powered by Mintora’s next-gen creative AI.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="/image"
                className="rounded-xl px-6 py-3 text-white bg-[#FF3B30] hover:bg-[#e62e22] transition font-semibold shadow-md"
              >
                Start Creating →
              </a>
              <a
                href="/pricing"
                className="rounded-xl px-6 py-3 bg-white border border-neutral-300 hover:bg-neutral-100 transition font-semibold"
              >
                See Pricing
              </a>
            </div>
          </div>

          {/* Cinematic banner video */}
          <div className="mt-16 rounded-3xl overflow-hidden shadow-xl border border-neutral-200">
            <video
              className="w-full h-[360px] object-cover"
              autoPlay
              loop
              muted
              playsInline
              src="https://cdn.coverr.co/videos/coverr-aerial-view-of-mountains-6048/1080p.mp4"
            />
          </div>
        </div>
      </section>

      {/* ================================
          2) ANIMATED SHOWCASE GRID
      ================================= */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
            Explore What Mintora Creates
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Image generator */}
            <ShowcaseCard
              title="AI Image Generation"
              desc="Cinematic, ultra-sharp visuals created in seconds."
              url="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=60"
            />

            {/* Video generator */}
            <ShowcaseCard
              title="AI Video Creation"
              desc="Dynamic, realistic motion — perfect for campaigns."
              url="https://images.unsplash.com/photo-1581276879432-15e50529f34a?auto=format&fit=crop&w=800&q=60"
            />

            {/* Music generator */}
            <ShowcaseCard
              title="AI Music & Sound"
              desc="Custom loops, stems and full tracks for creators."
              url="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=60"
            />
          </div>
        </div>
      </section>

      {/* ================================
          3) WHY MINTORA (Core Benefits)
      ================================= */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FFF6F5]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold">
            Why Creators Choose Mintora
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Feature
              title="Premium Quality"
              desc="Studio-grade generation tuned for cinematic work."
            />
            <Feature
              title="Fast & Reliable"
              desc="Lightning-fast inference with premium GPU routing."
            />
            <Feature
              title="Commercial Licensing"
              desc="Use your creations in films, games, branding & more."
            />
          </div>
        </div>
      </section>

      {/* ================================
          4) LOGOS + TESTIMONIALS (Your Row 2)
      ================================= */}
      <Testimonials />

      {/* ================================
          5) CTA FOOTER STRIPE
      ================================= */}
      <section className="py-20 text-center bg-gradient-to-r from-[#FF3B30] to-[#FF6F61] text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold">Start Creating Today</h2>
        <p className="mt-4 text-lg md:text-xl opacity-90">
          Unlimited ideas. One powerful platform.
        </p>
        <a
          href="/pricing"
          className="mt-8 inline-block rounded-2xl bg-white text-black font-semibold px-8 py-4 shadow-lg hover:bg-neutral-100 transition"
        >
          View Pricing →
        </a>
      </section>
    </div>
  );
}

function ShowcaseCard({ title, desc, url }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-neutral-200 shadow hover:shadow-lg transition">
      <div className="overflow-hidden">
        <img
          src={url}
          alt={title}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-neutral-600">{desc}</p>
      </div>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="text-center px-6">
      <h3 className="text-xl font-bold text-[#FF3B30]">{title}</h3>
      <p className="mt-3 text-neutral-600">{desc}</p>
    </div>
  );
}
