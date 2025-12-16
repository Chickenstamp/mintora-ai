// frontend/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-white/10 pt-16 pb-10">
      
      {/* Newsletter Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="rounded-3xl p-10 bg-gradient-to-r from-red-600 to-red-500 text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Mintora Labs
          </h2>
          <p className="text-white/90 mb-6">
            New AI tools, features and creative updates delivered monthly.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl text-black outline-none"
            />
            <button className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1 */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-white">Product</h4>
          <ul className="space-y-2">
            <li><Link to="/image" className="footer-link">Image Generator</Link></li>
            <li><Link to="/video" className="footer-link">Video Generator</Link></li>
            <li><Link to="/music" className="footer-link">Music Generator</Link></li>
            <li><Link to="/gaming" className="footer-link">Game Asset Generator</Link></li>
            <li><Link to="/templates" className="footer-link">Templates</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/enterprise" className="footer-link">Enterprise</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/careers" className="footer-link">Careers</Link></li>
            <li><Link to="/blog" className="footer-link">Blog</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-white">Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            <li><Link to="/refund" className="footer-link">Refund Policy</Link></li>
            <li><Link to="/license" className="footer-link">Content Licensing</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-white">Connect</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaYoutube /></a>
            <a href="#" className="hover:text-white transition"><FaTiktok /></a>
          </div>
        </div>
      </div>

      {/* Bottom Brand Bar */}
      <div className="mt-16 text-center">
        <img
          src="/brand/mintora-logo-wordmark.png"
          alt="Mintora Labs"
          className="mx-auto w-40 opacity-80"
        />
        <p className="mt-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} Mintora Labs — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
