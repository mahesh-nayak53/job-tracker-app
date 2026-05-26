import { useState } from "react";
import API from "../../api/axios";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await API.post("/ai/chat", {
        message,
      });

      setReply(res.data);
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
          AI Career Assistant
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Get career guidance, interview tips, resume help, and job advice
        </p>
      </div>

      {/* CHAT BOX */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sm:p-6">
        {/* TEXTAREA */}
        <div className="mb-5">
          <label className="block text-slate-700 font-semibold mb-3">
            Ask Your Question
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-slate-300 bg-slate-50 rounded-2xl p-4 h-40 sm:h-52 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 text-slate-700"
            placeholder="Example: How do I prepare for a Java Full Stack interview?"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={sendMessage}
          disabled={loading}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      {/* RESPONSE */}
      {reply && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
              AI
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">AI Response</h2>

              <p className="text-slate-500 text-sm">
                Career guidance assistant
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {reply}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
