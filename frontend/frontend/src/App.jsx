import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

// AUTH PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";

// ADMIN
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminApplications from "./pages/admin/AdminApplications";

// USER
import UserLayout from "./layout/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserJobs from "./pages/user/UserJobs";
import Profile from "./pages/user/Profile";
import AIChat from "./pages/user/AIChat";
import ResumeAnalyzer from "./pages/user/ResumeAnalyzer";
import InterviewAI from "./pages/user/InterviewAI";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="jobs" element={<AdminJobs />} />

          {/* NEW APPLICATIONS PAGE */}
          <Route path="applications" element={<AdminApplications />} />
        </Route>

        {/* ================= USER ================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="ROLE_USER">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />

          <Route path="jobs" element={<UserJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ai-chat" element={<AIChat />} />
          <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="interview-ai" element={<InterviewAI />} />
        </Route>

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
