import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  Briefcase,
  Bot,
  FileText,
  LogOut,
  Brain,
  Menu,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function UserLayout() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    API.get("/profile")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Profile load error:", err));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // USER INITIAL
  const getInitial = (email) => {
    if (!email) return "U";

    return email.charAt(0).toUpperCase();
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

      {/* OVERLAY */}
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
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* HEADER */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide text-cyan-400">
              User Panel
            </h1>

            <p className="text-slate-400 text-sm mt-1">Job Portal Dashboard</p>
          </div>

          {/* CLOSE BUTTON */}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className="m-5 bg-slate-800 rounded-2xl p-5 text-center shadow-lg border border-slate-700">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-bold shadow-md">
            {getInitial(user?.email)}
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            {user?.username || "User"}
          </h2>

          <p className="text-sm text-slate-400 break-words">
            {user?.email || "No email"}
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2 px-4">
          <Link
            to="/user/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-500 transition duration-200"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/user/jobs"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-500 transition duration-200"
          >
            <Briefcase size={20} />
            My Applications
          </Link>

          <Link
            to="/user/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-500 transition duration-200"
          >
            <User size={20} />
            Profile
          </Link>

          <Link
            to="/user/ai-chat"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-500 transition duration-200"
          >
            <Bot size={20} />
            AI Assistant
          </Link>

          <Link
            to="/user/resume-analyzer"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-500 transition duration-200"
          >
            <FileText size={20} />
            Resume Analyzer
          </Link>

          <Link
            to="/user/interview-ai"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-500 transition duration-200"
          >
            <Brain size={20} />
            AI Interview Prep
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="mt-auto p-4">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition duration-200 py-3 rounded-xl font-semibold shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-slate-100 p-4 sm:p-6 lg:p-8 w-full">
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 min-h-full overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
