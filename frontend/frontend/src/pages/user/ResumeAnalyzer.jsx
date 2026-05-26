import { useState } from "react";
import API from "../../api/axios";
import { FileText, Sparkles, UploadCloud } from "lucide-react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      alert("Upload resume first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await API.post(
        "/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);

    } catch (err) {
      console.error(err);

      alert("Analysis failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          AI Resume Analyzer
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Upload your resume and get AI-powered insights instantly
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* TOP SECTION */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 sm:p-8 text-white">

          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={28} />
            <h2 className="text-2xl font-bold">
              Resume Analysis
            </h2>
          </div>

          <p className="text-cyan-100 text-sm sm:text-base">
            Improve your resume with smart AI suggestions and feedback
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-8">

          {/* FILE UPLOAD */}
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-10 text-center bg-slate-50 hover:border-cyan-400 transition">

            <div className="flex justify-center mb-4">
              <div className="bg-cyan-100 text-cyan-600 p-4 rounded-full">
                <UploadCloud size={32} />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-700">
              Upload Resume
            </h3>

            <p className="text-slate-500 text-sm mt-1 mb-5">
              Supported format: PDF
            </p>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
            />

            {file && (
              <div className="mt-5 flex items-center justify-center gap-2 text-slate-700 font-medium break-all">
                <FileText size={18} />
                {file.name}
              </div>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={analyzeResume}
            disabled={loading}
            className="mt-6 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-200"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

          {/* RESULT */}
          {result && (
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-cyan-500" size={22} />

                <h2 className="text-xl font-bold text-slate-800">
                  AI Feedback
                </h2>
              </div>

              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-sm sm:text-base">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}