import { useEffect, useState } from "react";
import API from "../../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function UserDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/my");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // COUNTS
  const applied = applications.filter((a) => a.status === "APPLIED").length;

  const interview = applications.filter((a) => a.status === "INTERVIEW").length;

  const rejected = applications.filter((a) => a.status === "REJECTED").length;

  const offer = applications.filter((a) => a.status === "OFFER").length;

  const chartData = [
    {
      name: "Applied",
      value: applied,
      color: "#06B6D4",
    },

    {
      name: "Interview",
      value: interview,
      color: "#F59E0B",
    },

    {
      name: "Rejected",
      value: rejected,
      color: "#EF4444",
    },

    {
      name: "Offer",
      value: offer,
      color: "#10B981",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          My Dashboard
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Track your job applications and interview progress
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 mb-10">
        {/* APPLIED */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-l-[6px] border-cyan-500 hover:scale-[1.02] transition-all duration-200">
          <p className="text-slate-500 font-medium mb-2 text-sm sm:text-base">
            Applied
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-500">
            {applied}
          </h2>
        </div>

        {/* INTERVIEW */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-l-[6px] border-yellow-500 hover:scale-[1.02] transition-all duration-200">
          <p className="text-slate-500 font-medium mb-2 text-sm sm:text-base">
            Interview
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500">
            {interview}
          </h2>
        </div>

        {/* REJECTED */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-l-[6px] border-red-500 hover:scale-[1.02] transition-all duration-200">
          <p className="text-slate-500 font-medium mb-2 text-sm sm:text-base">
            Rejected
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-red-500">
            {rejected}
          </h2>
        </div>

        {/* OFFER */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-l-[6px] border-green-500 hover:scale-[1.02] transition-all duration-200">
          <p className="text-slate-500 font-medium mb-2 text-sm sm:text-base">
            Offer
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-green-500">
            {offer}
          </h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* PIE CHART */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-200">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Application Status
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Overview of your applications
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={5}
                cornerRadius={10}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={3}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-200">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Applications Breakdown
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Status-wise application count
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 13 }} />

              <YAxis tick={{ fill: "#475569", fontSize: 13 }} />

              <Tooltip />

              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sm:p-6 mt-10">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Recent Applications
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Your latest job application activity
          </p>
        </div>

        <div className="space-y-4">
          {applications.slice(0, 5).map((app) => (
            <div
              key={app.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all duration-200"
            >
              {/* LEFT */}
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {app.company}
                </h3>

                <p className="text-slate-600 mt-1">{app.role}</p>

                <p className="text-sm text-slate-400 mt-1">
                  Application Status
                </p>
              </div>

              {/* STATUS */}
              <span
                className="px-5 py-2 rounded-full text-white font-semibold text-sm w-fit"
                style={{
                  backgroundColor:
                    chartData.find(
                      (item) => item.name.toUpperCase() === app.status,
                    )?.color || "#64748B",
                }}
              >
                {app.status}
              </span>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              No applications found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
