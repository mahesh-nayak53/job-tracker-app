import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8081/api/job-posts";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  const [form, setForm] = useState({
    company: "",
    title: "",
    location: "",
    salary: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  // FETCH JOBS
  const fetchJobs = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // LOAD JOBS
  useEffect(() => {
    fetchJobs();
  }, []);

  // CREATE JOB
  const createJob = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(API, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // RESET FORM
      setForm({
        company: "",
        title: "",
        location: "",
        salary: "",
        description: "",
      });

      fetchJobs();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE JOB
  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* PAGE TITLE */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Admin Job Management
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Create and manage job postings
        </p>
      </div>

      {/* CREATE JOB FORM */}
      <form
        onSubmit={createJob}
        className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-200 mb-8 grid gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value,
              })
            }
            className="border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          <input
            type="text"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value,
              })
            }
            className="border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          <input
            type="text"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) =>
              setForm({
                ...form,
                salary: e.target.value,
              })
            }
            className="border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <textarea
          placeholder="Job Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="border border-slate-300 bg-slate-50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
          rows="5"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold py-3 rounded-xl shadow-md"
        >
          {loading ? "Creating..." : "Create Job"}
        </button>
      </form>

      {/* JOB LIST */}
      <div className="grid gap-5">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">
              {/* JOB INFO */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {job.title}
                  </h2>

                  <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-semibold w-fit">
                    {job.salary}
                  </span>
                </div>

                <p className="text-slate-600 mt-2 text-lg">{job.company}</p>

                <p className="text-slate-500 text-sm mt-1">{job.location}</p>

                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* DELETE BUTTON */}
              <div className="flex justify-end lg:justify-start">
                <button
                  onClick={() => deleteJob(job.id)}
                  className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2.5 rounded-xl font-semibold shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
