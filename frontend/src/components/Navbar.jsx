import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [enterpriseOpen, setEnterpriseOpen] = useState(false);

  const link =
    "px-3 py-2 rounded-md text-sm font-medium hover:text-red-600 transition";
  const active = ({ isActive }) =>
    isActive ? `${link} text-red-600` : `${link} text-gray-700`;

  return (
    <header className="bg-white/70 backdrop-blur sticky top-0 z-40 border-b">
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo / Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-extrabold text-xl tracking-tight"
        >
          <span className="text-red-600">M</span>
          <span>intora</span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className={active}>
            Home
          </NavLink>
          <NavLink to="/image" className={active}>
            Image
          </NavLink>
          <NavLink to="/video" className={active}>
            Video
          </NavLink>
          <NavLink to="/music" className={active}>
            Music
          </NavLink>
          <NavLink to="/gaming" className={active}>
            Gaming
          </NavLink>
          <NavLink to="/pricing" className={active}>
            Pricing
          </NavLink>

          {/* Enterprise Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setEnterpriseOpen(true)}
            onMouseLeave={() => setEnterpriseOpen(false)}
          >
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 transition">
              Enterprise ▾
            </button>

            {enterpriseOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
                <NavLink
                  to="/enterprise"
                  className="block px-4 py-3 text-sm hover:bg-gray-100"
                >
                  Enterprise Overview
                </NavLink>

                <NavLink
                  to="/enterprise/calculator"
                  className="block px-4 py-3 text-sm hover:bg-gray-100"
                >
                  Pricing Calculator
                </NavLink>

                <NavLink
                  to="/enterprise/contact"
                  className="block px-4 py-3 text-sm hover:bg-gray-100"
                >
                  Contact Sales
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
