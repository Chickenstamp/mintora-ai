import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import ImageGen from "./pages/ImageGen.jsx";
import VideoGen from "./pages/VideoGen.jsx";
import MusicGen from "./pages/MusicGen.jsx";
import Gaming from "./pages/Gaming.jsx";
import GameAssetGen from "./pages/GameAssetGen.jsx";
import Pricing from "./pages/Pricing.jsx";
import Templates from "./pages/Templates.jsx";
import FAQ from "./pages/FAQ.jsx";
import Enterprise from "./pages/Enterprise.jsx";
import Legal from "./pages/Legal.jsx";
// add
import EnterpriseForm from "./pages/EnterpriseForm.jsx";
import EnterpriseCalculator from "./pages/EnterpriseCalculator.jsx";
import EnterpriseQuoteSummary from "./pages/EnterpriseQuoteSummary.jsx";

// inside <Routes>
<Route path="/enterprise/form" element={<EnterpriseForm/>} />
<Route path="/enterprise/calculator" element={<EnterpriseCalculator/>} />
<Route path="/enterprise/quote" element={<EnterpriseQuoteSummary/>} />

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image" element={<ImageGen />} />
          <Route path="/video" element={<VideoGen />} />
          <Route path="/music" element={<MusicGen />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/gameassets" element={<GameAssetGen />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
