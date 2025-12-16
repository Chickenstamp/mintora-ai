import React, { useState } from "react";
import { Link } from "react-router-dom";

const USD = [
  { name: "Starter", price: 9.99, features: ["400 images/mo", "10 short videos/mo", "Standard models", "Basic music (non-commercial)"], note: "No commercial use" },
  { name: "Creator", price: 19.99, features: ["1,500 images/mo", "50 videos/mo", "Upscaling & BG removal", "Sprites (no commercial games)", "Music: social use"], note: "Sprites only; music for social" },
  { name: "Gamer / Developer", price: 39.99, features: ["3,000 images/mo", "120 videos/mo", "Sprite + Texture + Level gen", "Export packs for engines", "Full commercial game license", "Music loops (commercial)"], highlight: true },
  { name: "Studio", price: 79.99, features: ["Unlimited images*", "300 videos/mo", "API + Team seats (3)", "Priority compute", "PBR suite (albedo/normal/roughness)", "Music Pro included"], note: "*Fair use applies" },
];

const currencyMap = { USD:1, AUD:1.55, GBP:0.78, EUR:0.92, AED:3.67 };

export default function Pricing() {
  const [currency, setCurrency] = useState("USD");
  const [yearly, setYearly] = useState(false);
  const fx = currencyMap[currency];
  const fmt = (n) => {
    const v = yearly ? n*12*0.79 : n;
    const rounded = Math.floor(v*fx)+0.99;
    const sym = currency==="USD"?"$":currency==="EUR"?"€":currency==="GBP"?"£":currency==="AUD"?"A$":"AED ";
    return `${sym}${rounded.toFixed(2)}`;
  };
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-5xl font-extrabold">Pricing</h2>
        <div className="flex items-center gap-3">
          <select value={currency} onChange={e=>setCurrency(e.target.value)} className="bg-[#0C0F14] border border-white/20 rounded-xl px-3 py-2">
            {Object.keys(currencyMap).map(c=><option key={c}>{c}</option>)}
          </select>
          <label className="flex items-center gap-2 text-white/70">
            <input type="checkbox" checked={yearly} onChange={e=>setYearly(e.target.checked)} />
            Bill yearly (save ~21%)
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mt-12">
        {USD.map(t => (
          <div key={t.name} className={`bg-[#1C1F26] p-8 rounded-2xl border ${t.highlight ? "border-[#E32727]" : "border-white/5"} shadow-xl`}>
            <h3 className="text-2xl font-bold">{t.name}</h3>
            <p className="text-5xl font-extrabold mt-6">{fmt(t.price)}<span className="text-lg text-white/50">/{yearly ? "yr" : "mo"}</span></p>
            {t.note && <p className="text-white/60 mt-2">{t.note}</p>}
            <ul className="mt-6 space-y-2 text-white/80">
              {t.features.map(f => <li key={f}>• {f}</li>)}
            </ul>
            <Link to="#" className="block text-center mt-8 bg-[#E32727] hover:bg-red-600 rounded-xl p-3 text-lg font-semibold">Choose</Link>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#1C1F26] p-6 rounded-2xl border border-white/10">
        <h3 className="text-2xl font-bold">Music Add-ons</h3>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>Music Pro Add-on: $14.99/mo (included in Studio)</li>
          <li>Credits pack: 10 tracks for $4.99; 50 for $19.99</li>
        </ul>
      </div>

      <p className="text-white/50 mt-6 text-sm">
        Commercial rights vary by plan; see <a href="/legal/license" className="underline">Game Asset License</a> and Terms.
      </p>
    </div>
  );
}
