// frontend/src/pages/Pricing.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Pricing() {
  // -----------------------------
  // Currency System
  // -----------------------------
  const currencies = {
    AUD: { symbol: "A$", rate: 1 },
    USD: { symbol: "$", rate: 0.67 },
    EUR: { symbol: "€", rate: 0.61 },
    GBP: { symbol: "£", rate: 0.53 }
  };

  const [currency, setCurrency] = useState("AUD");

  const convert = (audPrice) => {
    const converted = audPrice * currencies[currency].rate;
    return `${currencies[currency].symbol}${converted.toFixed(2)}`;
  };

  // -----------------------------
  // Stripe Checkout
  // -----------------------------
  const handleCheckout = async (plan) => {
    try {
      const res = await axios.post("http://localhost:10000/api/stripe/create-checkout", { plan });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Checkout failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0f14] to-[#08090c] text-white px-6 py-20">

      {/* ----------------------------- */}
      {/* Header */}
      {/* ----------------------------- */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold">
          Simple, Transparent <span className="text-red-500">Pricing</span>
        </h1>
        <p className="text-gray-300 text-lg mt-4">
          Flexible plans for creators, studios & enterprises.
        </p>

        {/* Currency Picker */}
        <div className="mt-6 flex justify-center">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md cursor-pointer"
          >
            <option value="AUD">🇦🇺 AUD</option>
            <option value="USD">🇺🇸 USD</option>
            <option value="EUR">🇪🇺 EUR</option>
            <option value="GBP">🇬🇧 GBP</option>
          </select>
        </div>
      </div>

      {/* ----------------------------- */}
      {/* Pricing Grid */}
      {/* ----------------------------- */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {/* ----- Monthly ----- */}
        <div className="bg-[#10131a] p-8 rounded-2xl border border-[#1f242e] shadow-xl hover:scale-[1.02] transition">
          <h2 className="text-3xl font-bold mb-4">Monthly</h2>
          <p className="text-gray-300 mb-6">Cancel anytime. Perfect for ongoing creators.</p>

          {/* Price */}
          <p className="text-5xl font-extrabold text-red-500 mb-6">
            {convert(29.99)}
            <span className="text-lg text-gray-400 font-normal"> /mo</span>
          </p>

          <ul className="text-gray-300 space-y-3 mb-6">
            <li>✔ Unlimited image generation</li>
            <li>✔ Unlimited video generation</li>
            <li>✔ AI Music & Gaming tools included</li>
            <li>✔ 4K media downloads</li>
          </ul>

          <button
            onClick={() => handleCheckout("monthly")}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
          >
            Get Started
          </button>
        </div>

        {/* ----- Yearly ----- */}
        <div className="bg-[#161b25] p-8 rounded-2xl border border-red-600 shadow-xl hover:scale-[1.04] transition relative">
          <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
            Best Value
          </span>

          <h2 className="text-3xl font-bold mb-4">Yearly</h2>
          <p className="text-gray-300 mb-6">Save 35% when billed annually.</p>

          <p className="text-5xl font-extrabold text-red-500 mb-6">
            {convert(199.99)}
            <span className="text-lg text-gray-400 font-normal"> /yr</span>
          </p>

          <ul className="text-gray-300 space-y-3 mb-6">
            <li>✔ Everything in Monthly</li>
            <li>✔ Priority compute</li>
            <li>✔ Commercial licensing</li>
            <li>✔ Private model training access</li>
          </ul>

          <button
            onClick={() => handleCheckout("yearly")}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
          >
            Go Yearly
          </button>
        </div>

        {/* ----- Single Use ----- */}
        <div className="bg-[#10131a] p-8 rounded-2xl border border-[#1f242e] shadow-xl hover:scale-[1.02] transition">
          <h2 className="text-3xl font-bold mb-4">Single Use</h2>
          <p className="text-gray-300 mb-6">One-time purchase. No subscription.</p>

          <p className="text-5xl font-extrabold text-red-500 mb-6">
            {convert(9.99)}
          </p>

          <ul className="text-gray-300 space-y-3 mb-6">
            <li>✔ 50 image credits</li>
            <li>✔ 10 video credits</li>
            <li>✔ 10 music tracks</li>
            <li>✔ 5 game assets</li>
          </ul>

          <button
            onClick={() => handleCheckout("single")}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
          >
            Buy Pack
          </button>
        </div>
      </div>

      {/* ----------------------------- */}
      {/* Payment Badges */}
      {/* ----------------------------- */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-6 opacity-90">
        <img src="/badges/visa-color.svg" className="h-8" alt="Visa" />
        <img src="/badges/mastercard-color.svg" className="h-8" alt="Mastercard" />
        <img src="/badges/amex-color.svg" className="h-8" alt="American Express" />
        <img src="/badges/stripe-color.svg" className="h-8" alt="Stripe" />
      </div>

    </div>
  );
}
