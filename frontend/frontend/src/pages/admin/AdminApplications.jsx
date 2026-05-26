import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("ALL");

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

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/${id}/status?status=${status}`);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  // FILTER LOGIC
  const filteredApplications =
    filter === "ALL"
      ? applications
      : applications.filter((app) => app.status === filter);

  // STATUS COLORS
  const getStatusStyle = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700 border border-blue-200";

      case "INTERVIEW":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";

      case "REJECTED":
        return "bg-red-100 text-red-700 border border-red-200";

      case "OFFER":
        return "bg-green-100 text-green-700 border border-green-200";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
          Job Applications
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Manage and track all candidate applications
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
        {["ALL", "APPLIED", "INTERVIEW", "REJECTED", "OFFER"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 sm:px-5 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 shadow-sm ${
              filter === s
                ? "bg-cyan-500 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-6 text-center text-slate-500">
            No applications found
          </div>
        ) : (
          filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl shadow-md border border-slate-200 p-5"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">
                    {app.username}
                  </h2>

                  <p className="text-slate-600 text-sm mt-1">
                    {app.company}
                  </p>

                  <p className="text-slate-500 text-sm">
                    {app.role}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                    app.status,
                  )}`}
                >
                  {app.status}
                </span>
              </div>

              <div className="mt-5">
                <label className="text-sm font-medium text-slate-600">
                  Update Status
                </label>

                <select
                  value={app.status}
                  onChange={(e) =>
                    updateStatus(app.id, e.target.value)
                  }
                  className="w-full mt-2 border border-slate-300 px-4 py-2 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="APPLIED">APPLIED</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="OFFER">OFFER</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
                {app.resumeUrl ? (
                  <>
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl font-medium transition text-sm"
                    >
                      View Resume
                    </a>

                    <a
                      href={app.resumeUrl}
                      download
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition text-sm"
                    >
                      Download
                    </a>
                  </>
                ) : (
                  <span className="text-slate-400 text-sm">
                    No Resume Available
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {/* TABLE HEAD */}
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-5 text-left font-semibold">User</th>
                <th className="p-5 text-left font-semibold">Company</th>
                <th className="p-5 text-left font-semibold">Role</th>
                <th className="p-5 text-left font-semibold">Status</th>
                <th className="p-5 text-left font-semibold">Update</th>
                <th className="p-5 text-left font-semibold">Resume</th>
                <th className="p-5 text-left font-semibold">Download</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-10 text-center text-slate-500 text-lg"
                  >
                    No applications found
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                  >
                    {/* USER */}
                    <td className="p-5 font-semibold text-slate-800">
                      {app.username}
                    </td>

                    {/* COMPANY */}
                    <td className="p-5 text-slate-600">
                      {app.company}
                    </td>

                    {/* ROLE */}
                    <td className="p-5 text-slate-600">
                      {app.role}
                    </td>

                    {/* STATUS */}
                    <td className="p-5">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(
                          app.status,
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* UPDATE */}
                    <td className="p-5">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateStatus(app.id, e.target.value)
                        }
                        className="border border-slate-300 px-4 py-2 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        <option value="APPLIED">APPLIED</option>
                        <option value="INTERVIEW">INTERVIEW</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="OFFER">OFFER</option>
                      </select>
                    </td>

                    {/* VIEW RESUME */}
                    <td className="p-5">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl font-medium transition"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-slate-400">
                          No Resume
                        </span>
                      )}
                    </td>

                    {/* DOWNLOAD */}
                    <td className="p-5">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          download
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-slate-400">
                          Not Available
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}