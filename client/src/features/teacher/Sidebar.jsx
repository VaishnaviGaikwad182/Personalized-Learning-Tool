import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  Upload,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <div
      className={`bg-gray-900 text-white flex flex-col min-h-screen
      transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-lg font-semibold">Teacher Dashboard</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col mt-4 space-y-1">
        <NavLink
          to="/teacher/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg mx-2
            transition-all
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/teacher/fa-mode"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg mx-2
            transition-all
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          <ClipboardList size={20} />
          {!collapsed && <span>FA Mode</span>}
        </NavLink>

        <NavLink
          to="/teacher/submission-status"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg mx-2
            transition-all
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          <FileText size={20} />
          {!collapsed && <span>Submissions</span>}
        </NavLink>

        <NavLink
          to="/teacher/queries"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg mx-2
            transition-all
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          <MessageSquare size={20} />
          {!collapsed && <span>Queries</span>}
        </NavLink>

        <NavLink
          to="/teacher/marks-upload"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg mx-2
            transition-all
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          <Upload size={20} />
          {!collapsed && <span>Marks Upload</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
