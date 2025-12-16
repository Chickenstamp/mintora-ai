import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ImageGen from "./pages/ImageGen.jsx";
import VideoGen from "./pages/VideoGen.jsx";
import Pricing from "./pages/Pricing.jsx";
import Gaming from "./pages/Gaming.jsx";
import Templates from "./pages/Templates.jsx";
import Terms from "./pages/legal/Terms.jsx";
import Privacy from "./pages/legal/Privacy.jsx";
import License from "./pages/legal/License.jsx";
import FAQ from "./pages/FAQ.jsx";
import Music from "./pages/Music.jsx"; // NEW

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0C0F14] text-white">
        <Navbar />
        <main className="min-h-[calc(100vh-140px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image" element={<ImageGen />} />
            <Route path="/video" element={<VideoGen />} />
            <Route path="/music" element={<Music />} /> {/* NEW */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal/terms" element={<Terms />} />
            <Route path="/legal/privacy" element={<Privacy />} />
            <Route path="/legal/license" element={<License />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}