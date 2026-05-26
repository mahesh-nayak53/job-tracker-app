import { useState } from "react";
import API from "../../api/axios";

export default function InterviewAI() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!role.trim() || !skills.trim()) return;

    setLoading(true);

    try {
      const res = await API.post("/interview-ai", {
        role,
        skills,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          AI Interview Preparation
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Generate interview questions and preparation tips instantly
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sm:p-6">

        <div className="grid gap-5">

          {/* ROLE INPUT */}
          <div>

            <label className="block text-slate-700 font-semibold mb-2">
              Job Role
            </label>

            <input
              type="text"
              placeholder="Example: Java Full Stack Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* SKILLS INPUT */}
          <div>

            <label className="block text-slate-700 font-semibold mb-2">
              Skills
            </label>

            <input
              type="text"
              placeholder="Example: Java, Spring Boot, React, SQL"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={generate}
            disabled={loading}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sm:p-6">

          {/* RESULT HEADER */}
          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
              AI
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Interview Preparation
              </h2>

              <p className="text-slate-500 text-sm">
                Personalized AI-generated questions and tips
              </p>

            </div>
          </div>

          {/* RESULT CONTENT */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">

            <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-sm sm:text-base">
              {result}
            </p>

          </div>
        </div>
      )}
    </div>
  );
}