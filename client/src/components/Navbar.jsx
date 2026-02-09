import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Dashboard link logic
  const dashboardLink = location.pathname.startsWith("/student")
    ? "/student/dashboard"
    : location.pathname.startsWith("/teacher")
    ? "/teacher/dashboard"
    : "/";

  // Get user name
  const name = localStorage.getItem("name") || "";
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-blue-200 text-black flex justify-between items-center px-4 py-2 min-h-[64px]">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="College Logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="font-bold text-sm sm:text-base md:text-lg leading-tight">
          Pimpri Chinchwad College of Engineering
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 font-semibold">
        <Link to={dashboardLink} className="hover:underline">
          Dashboard
        </Link>

        {/* Avatar */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="w-9 h-9 bg-red-500 rounded-full text-white flex items-center justify-center font-bold cursor-pointer"
          >
            {initials}
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
