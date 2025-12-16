// frontend/src/components/WhyMintora.jsx
import React from "react";

const IconLightning = () => (
  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m13 2-9 13h7l-1 7 9-13h-7l1-7Z" />
  </svg>
);
const IconCinema = () => (
  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 5v14M17 5v14" />
  </svg>
);
const IconWave = () => (
  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 12c2 0 2-4 4-4s2 8 4 8 2-8 4-8 2 4 4 4" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default function WhyMintora() {
  return (
    <section
      id="why-mintora"
      className="
        relative overflow-hidden
        bg-white
        [background:radial-gradient(1200px_500px_at_-10%_-10%,rgba(255,86,86,.12)_0%,rgba(255,86,86,0)_60%),radial-gradient(1000px_400px_at_110%_0%,rgba(87,148,255,.14)_0%,rgba(87,148,255,0)_55%)]
      "
    >
      {/* top accent stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF3B30] via-[#FF6B6B] to-[#5794FF]" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold tracking-wide text-black/70">
            Why creators choose Mintora
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            Bright. Fast. <span className="text-[#FF3B30]">Cinematic</span>.
          </h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">
            Turn simple prompts into stunning visuals, video, music and game-ready assets — with
            commercial use, zero friction, and Apple-level polish.
          </p>
        </div>

        {/* features grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* card */}
          <div className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#FFE8E6] p-3 text-[#FF3B30]">
              <IconLightning />
            </div>
            <h3 className="text-lg font-semibold">Ultra-fast rendering</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Optimized pipelines deliver assets in seconds, ready to use anywhere.
            </p>
          </div>

          <div className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#E8F0FF] p-3 text-[#5794FF]">
              <IconCinema />
            </div>
            <h3 className="text-lg font-semibold">Cinematic quality</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Rich contrast, crisp detail and production-ready outputs by default.
            </p>
          </div>

          <div className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#EAFBE7] p-3 text-[#16A34A]">
              <IconWave />
            </div>
            <h3 className="text-lg font-semibold">Multi-modal</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Images, video, music and lightweight gaming assets — one clean studio.
            </p>
          </div>

          <div className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#FFF6D7] p-3 text-[#EAB308]">
              <IconShield />
            </div>
            <h3 className="text-lg font-semibold">Commercial license</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Clear usage out of the box. Ship with confidence for clients and brands.
            </p>
          </div>
        </div>

        {/* bottom CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/templates"
            className="
              inline-flex items-center justify-center rounded-xl
              bg-black px-5 py-3 text-sm font-semibold text-white
              shadow-sm transition hover:opacity-90
            "
          >
            Browse templates
          </a>
          <a
            href="/pricing"
            className="
              inline-flex items-center justify-center rounded-xl
              bg-white px-5 py-3 text-sm font-semibold text-neutral-800
              ring-1 ring-black/10 transition hover:bg-black/5
            "
          >
            See pricing
          </a>
        </div>
      </div>
    </section>
  );
}
