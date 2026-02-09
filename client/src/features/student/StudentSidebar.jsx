import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Upload,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const StudentSidebar = ({ open, setOpen }) => {
  const navStyle = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg mx-2 transition-all
    ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300"}`;

  return (
    <div
      className={`bg-gray-900 text-white flex flex-col min-h-screen
      transition-all duration-300
      ${open ? "w-64" : "w-20"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {open && <h1 className="text-lg font-semibold">Student Dashboard</h1>}

        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-white"
        >
          {open ? <PanelLeftClose size={22} /> : <PanelLeftOpen size={22} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col mt-4 space-y-1">
        <NavLink to="/student/dashboard" className={navStyle}>
          <LayoutDashboard size={20} />
          {open && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/student/marks" className={navStyle}>
          <BarChart3 size={20} />
          {open && <span>FA / SA Marks</span>}
        </NavLink>

        <NavLink to="/student/queries" className={navStyle}>
          <MessageSquare size={20} />
          {open && <span>Queries</span>}
        </NavLink>

        {/* ✅ NEW FA SUBMISSION TAB */}
        <NavLink to="/student/fa-submit" className={navStyle}>
          <Upload size={20} />
          {open && <span>FA Submission</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default StudentSidebar;
