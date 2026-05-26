import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-72 bg-slate-900 text-white shadow-2xl flex flex-col transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* TOP */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">
              Admin Panel
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Job Portal Management
            </p>
          </div>

          {/* CLOSE BUTTON MOBILE */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-3 p-5">

          <Link
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500 transition-all duration-200 font-medium"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/admin/jobs"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500 transition-all duration-200 font-medium"
          >
            <BriefcaseBusiness size={20} />
            Manage Jobs
          </Link>

          <Link
            to="/admin/applications"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500 transition-all duration-200 font-medium"
          >
            <FileText size={20} />
            Applications
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="mt-auto p-5">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition-all duration-200 py-3 rounded-xl font-semibold shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 w-full">

        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 min-h-full overflow-x-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}