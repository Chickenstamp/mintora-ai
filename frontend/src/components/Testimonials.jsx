// frontend/src/components/Testimonials.jsx
import React from "react";

const logos = [
  { name: "Aperture", initials: "Ap" },
  { name: "Nebula", initials: "Nb" },
  { name: "Velocity", initials: "Ve" },
  { name: "Orbit", initials: "Ob" },
  { name: "Drift", initials: "Df" },
];

const quotes = [
  {
    name: "Jamie L.",
    role: "Filmmaker",
    text:
      "Mintora gave me cinematic shots for a pitch in hours instead of days. The UI feels premium and fast.",
  },
  {
    name: "Sam R.",
    role: "Brand Designer",
    text:
      "The image quality is stunning. Clients love the results and my workflow is finally fun again.",
  },
  {
    name: "Alex P.",
    role: "Game Dev",
    text:
      "Generated concept art and sprite sheets in one session. Licensing is clear, which is huge.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="
        relative overflow-hidden py-16
        bg-white
        [background:radial-gradient(1200px_500px_at_-10%_-10%,rgba(255,86,86,.10)_0%,rgba(255,86,86,0)_60%),radial-gradient(1000px_400px_at_110%_0%,rgba(87,148,255,.12)_0%,rgba(87,148,255,0)_55%)]
      "
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Mini headline */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold tracking-wide text-black/70">
            Trusted by creators & teams
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            Beautiful results. Professional control.
          </h2>
        </div>

        {/* Logo strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {logos.map((l, i) => (
            <div
              key={i}
              className="rounded-xl border border-black/10 bg-white px-4 py-6 text-center text-sm font-semibold text-neutral-700"
            >
              {l.initials} • {l.name}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <p className="text-neutral-700">“{q.text}”</p>
              <div className="mt-4 text-sm text-neutral-500">
                <strong className="text-neutral-800">{q.name}</strong> — {q.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
