import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function UserJobs() {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [resume, setResume] = useState(null);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);

  // FETCH JOBS
  const fetchJobs = async () => {
    try {
      const res = await API.get("/job-posts");

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);

      setJobs([]);
    }
  };

  // FETCH SAVED JOBS
  const fetchSavedJobs = async () => {
    try {
      const res = await API.get("/saved-jobs");

      setSavedJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);

      setSavedJobs([]);
    }
  };

  // CHECK SAVED
  const isSaved = (jobId) => {
    return savedJobs.some(
      (saved) => saved.jobPost.id === jobId
    );
  };

  // SAVE JOB
  const saveJob = async (jobId) => {
    try {
      await API.post(`/saved-jobs/${jobId}`);

      fetchSavedJobs();
    } catch (err) {
      console.error(err);
    }
  };

  // REMOVE SAVED JOB
  const removeSavedJob = async (jobId) => {
    try {
      await API.delete(`/saved-jobs/${jobId}`);

      fetchSavedJobs();
    } catch (err) {
      console.error(err);
    }
  };

  // UPLOAD RESUME
  const uploadResume = async () => {
    const formData = new FormData();

    formData.append("file", resume);

    const res = await API.post(
      "/files/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  // APPLY JOB
  const applyJob = async (jobId) => {
    setLoading(true);

    try {
      let resumeUrl = "";

      if (resume) {
        resumeUrl = await uploadResume();
      }

      await API.post("/applications/apply", {
        jobPostId: jobId,
        resumeUrl,
      });

      fetchJobs();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // FILTER JOBS
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.company
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      job.applicationStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // PAGINATION
  const lastIndex =
    currentPage * jobsPerPage;

  const firstIndex =
    lastIndex - jobsPerPage;

  const currentJobs =
    filteredJobs.slice(
      firstIndex,
      lastIndex
    );

  const totalPages = Math.ceil(
    filteredJobs.length / jobsPerPage
  );

  // STATUS COLORS
  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-cyan-500";

      case "INTERVIEW":
        return "bg-yellow-500";

      case "REJECTED":
        return "bg-red-500";

      case "OFFER":
        return "bg-green-500";

      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Available Jobs
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Explore and apply for jobs
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
        />

        {/* FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
        >
          <option value="ALL">
            ALL JOBS
          </option>

          <option value="APPLIED">
            APPLIED
          </option>

          <option value="INTERVIEW">
            INTERVIEW
          </option>

          <option value="REJECTED">
            REJECTED
          </option>

          <option value="OFFER">
            OFFER
          </option>
        </select>
      </div>

      {/* JOB LIST */}
      {/* JOB LIST */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {currentJobs.map((job) => (

    <div
      key={job.id}
      className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 sm:p-6 hover:shadow-xl transition-all duration-200 h-full flex flex-col justify-between"
    >

      {/* TOP */}
      <div>

        {/* TITLE + STATUS */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              {job.title}
            </h2>

            <p className="text-slate-600 mt-2 text-lg">
              {job.company}
            </p>

          </div>

          {/* STATUS */}
          {job.applied && (
            <div
              className={`text-white px-5 py-2 rounded-full font-semibold text-sm w-fit ${getStatusColor(
                job.applicationStatus
              )}`}
            >
              {job.applicationStatus}
            </div>
          )}

        </div>

        {/* LOCATION + SALARY */}
        <div className="flex flex-wrap gap-3 mt-4">

          <span className="bg-slate-100 text-slate-700 px-4 py-1 rounded-full text-sm font-medium">
            {job.location}
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
            {job.salary}
          </span>

        </div>

        {/* DESCRIPTION */}
        <p className="mt-5 text-slate-600 leading-relaxed line-clamp-4">
          {job.description}
        </p>

      </div>

      {/* BOTTOM */}
      <div>

        {/* FILE */}
        {!job.applied && (
          <div className="mt-6">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResume(
                  e.target.files[0]
                )
              }
              className="w-full text-sm border border-slate-300 rounded-xl p-3 bg-slate-50"
            />
          </div>
        )}

        {/* BUTTONS */}
        <div className="mt-6 flex flex-wrap gap-4">

          {/* APPLY */}
          {job.applied ? (
            <button
              disabled
              className={`text-white px-6 py-3 rounded-2xl font-semibold cursor-not-allowed ${getStatusColor(
                job.applicationStatus
              )}`}
            >
              {job.applicationStatus}
            </button>
          ) : (
            <button
              onClick={() =>
                applyJob(job.id)
              }
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-md"
            >
              {loading
                ? "Applying..."
                : "Apply Now"}
            </button>
          )}

          {/* SAVE */}
          <button
            onClick={() =>
              isSaved(job.id)
                ? removeSavedJob(job.id)
                : saveJob(job.id)
            }
            className={`px-6 py-3 rounded-2xl text-white font-semibold transition-all duration-200 shadow-md ${
              isSaved(job.id)
                ? "bg-green-500 hover:bg-green-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {isSaved(job.id)
              ? "Saved"
              : "Save Job"}
          </button>

        </div>

      </div>
    </div>

  ))}

</div>

      {/* EMPTY */}
      {currentJobs.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center text-slate-500 shadow-lg mt-6">
          No jobs found
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-3 mt-10">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            className="bg-slate-300 hover:bg-slate-400 px-5 py-2 rounded-xl font-medium disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map(
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
                className={`px-5 py-2 rounded-xl font-medium transition-all duration-200 ${
                  currentPage ===
                  index + 1
                    ? "bg-cyan-500 text-white"
                    : "bg-white hover:bg-slate-200"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            className="bg-slate-300 hover:bg-slate-400 px-5 py-2 rounded-xl font-medium disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

      {/* SAVED JOBS */}
      <div className="mt-16">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Saved Jobs
          </h1>

          <p className="text-slate-500 mt-2">
            Jobs you bookmarked for later
          </p>
        </div>

        <div className="grid gap-5">

          {savedJobs.length > 0 ? (
            savedJobs.map((saved) => (

              <div
                key={saved.id}
                className="bg-yellow-50 border border-yellow-200 rounded-3xl shadow-md p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
              >

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    {saved.jobPost.title}
                  </h2>

                  <p className="text-slate-600 mt-2">
                    {saved.jobPost.company}
                  </p>

                  <p className="text-slate-500 mt-2">
                    {saved.jobPost.location}
                  </p>

                </div>

                <button
                  onClick={() =>
                    removeSavedJob(
                      saved.jobPost.id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-md"
                >
                  Remove Saved
                </button>

              </div>

            ))
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center text-slate-500 shadow-lg">
              No saved jobs available
            </div>
          )}

        </div>
      </div>
    </div>
  );
}