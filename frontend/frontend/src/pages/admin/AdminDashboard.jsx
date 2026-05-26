import { useEffect, useState } from "react";
import API from "../../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // STATUS COLORS
  const STATUS_COLORS = {
    APPLIED: "#06B6D4",
    INTERVIEW: "#F59E0B",
    REJECTED: "#EF4444",
    OFFER: "#10B981",
  };

  // COUNTS
  const total = applications.length;

  const applied = applications.filter(
    (a) => a.status === "APPLIED",
  ).length;

  const interview = applications.filter(
    (a) => a.status === "INTERVIEW",
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "REJECTED",
  ).length;

  const offer = applications.filter(
    (a) => a.status === "OFFER",
  ).length;

  // GRAPH DATA
  const chartData = [
    {
      name: "Applied",
      value: applied,
      color: STATUS_COLORS.APPLIED,
    },

    {
      name: "Interview",
      value: interview,
      color: STATUS_COLORS.INTERVIEW,
    },

    {
      name: "Rejected",
      value: rejected,
      color: STATUS_COLORS.REJECTED,
    },

    {
      name: "Offer",
      value: offer,
      color: STATUS_COLORS.OFFER,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Monitor applications and hiring progress
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 mb-8 sm:mb-10">

        {/* TOTAL */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-slate-200 hover:scale-[1.02] transition">

          <p className="text-slate-500 font-medium mb-2 text-sm sm:text-base">
            Total Applications
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
            {total}
          </h2>

        </div>

        {/* APPLIED */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-l-[6px] border-cyan-500 hover:scale-[1.02] transition">

          <p className="text-slate-500 font-medium mb-2 text-sm sm:text-base">
            Applied
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-500">
            {applied}
          </h2>

        </div>

        {/* INTERVIEW */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-l-[6px] border-yellow-500 hover:scale-[1.02] transition">

          <p className="text-slate-500 font-medium mb-2 text-sm sm:text-base">
            Interview
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500">
            {interview}
          </h2>

        </div>

        {/* OFFER */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border-l-[6px] border-green-500 hover:scale-[1.02] transition">

          <p className="text-slate-500 font-medium mb-2 text-sm sm:text-base">
            Offers
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-green-500">
            {offer}
          </h2>

        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">

        {/* BAR CHART */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200">

          <div className="mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Applications Overview
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Status-wise application count
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={chartData}>

                <XAxis
                  dataKey="name"
                  tick={{ fill: "#475569", fontSize: 12 }}
                />

                <YAxis
                  tick={{ fill: "#475569", fontSize: 12 }}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[10, 10, 0, 0]}
                >

                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                    />
                  ))}

                </Bar>

              </BarChart>

            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200">

          <div className="mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Status Distribution
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Percentage breakdown of applications
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
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
                    stroke="#fff"
                    strokeWidth={3}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6">

        <div className="mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Recent Applications
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Latest candidate activities
          </p>
        </div>

        <div className="space-y-4">

          {applications.slice(0, 5).map((app) => (

            <div
              key={app.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 hover:shadow-md transition"
            >

              {/* LEFT */}
              <div className="min-w-0">

                <h3 className="text-base sm:text-lg font-bold text-slate-800 break-words">
                  {app.username}
                </h3>

                <p className="text-slate-600 mt-1 break-words">
                  {app.company}
                </p>

                <p className="text-sm text-slate-400 mt-1 break-words">
                  {app.role}
                </p>

              </div>

              {/* STATUS */}
              <span
                className="px-4 sm:px-5 py-2 rounded-full text-white font-semibold text-sm w-fit"
                style={{
                  backgroundColor:
                    STATUS_COLORS[app.status] || "#64748B",
                }}
              >
                {app.status}
              </span>

            </div>

          ))}

        </div>
      </div>
    </div>
  );
}