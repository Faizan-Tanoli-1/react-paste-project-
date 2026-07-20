import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Paste<span className="text-cyan-400">App</span>
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 sm:px-5 sm:text-base ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "text-gray-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 sm:px-5 sm:text-base ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "text-gray-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
