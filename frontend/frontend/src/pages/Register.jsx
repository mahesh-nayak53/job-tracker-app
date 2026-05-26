import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { User, Lock, Briefcase } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/auth/register", form);

      alert("Registered successfully");

      navigate("/");
    } catch (err) {
      console.error(err);

      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8">
        {/* LOGO */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Briefcase className="text-white" size={32} />
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Register to access the Job Portal
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* USERNAME */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Username
            </label>

            <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus-within:ring-2 focus-within:ring-cyan-400">
              <User size={20} className="text-slate-400" />

              <input
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                className="w-full bg-transparent outline-none ml-3 text-slate-700"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Password
            </label>

            <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus-within:ring-2 focus-within:ring-cyan-400">
              <Lock size={20} className="text-slate-400" />

              <input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full bg-transparent outline-none ml-3 text-slate-700"
                required
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* LOGIN */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm sm:text-base">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-cyan-500 font-semibold cursor-pointer hover:text-cyan-600"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
