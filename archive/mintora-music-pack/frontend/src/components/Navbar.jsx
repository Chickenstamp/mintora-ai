import React from "react";
import { NavLink } from "react-router-dom";

const link =
  "text-white/80 hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#E32727] hover:after:w-full after:transition-all";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0C0F14]/80 backdrop-blur border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-10 w-auto" alt="Mintora" />
          <span className="font-extrabold text-xl hidden sm:inline">Mintora Labs</span>
        </div>
        <div className="flex items-center gap-6 text-lg">
          <NavLink to="/" className={link} end>Home</NavLink>
          <NavLink to="/image" className={link}>Image</NavLink>
          <NavLink to="/video" className={link}>Video</NavLink>
          <NavLink to="/music" className={link}>Music</NavLink>{/* NEW */}
          <NavLink to="/gaming" className={link}>Gaming</NavLink>
          <NavLink to="/pricing" className={link}>Pricing</NavLink>
          <NavLink to="/faq" className={link}>FAQ</NavLink>
        </div>
      </div>
    </nav>
  );
}