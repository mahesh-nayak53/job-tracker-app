import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Briefcase, Lock, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      // SAVE TOKEN + ROLE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // REDIRECT
      if (res.data.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {

      console.error("LOGIN ERROR:", err);

      alert("Invalid username or password");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200">

        {/* LOGO */}
        <div className="flex justify-center mb-5">

          <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg">
            <Briefcase className="text-white" size={32} />
          </div>

        </div>

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Login to continue to your dashboard
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* USERNAME */}
          <div>

            <label className="text-sm font-semibold text-slate-600 block mb-2">
              Username
            </label>

            <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-400 bg-slate-50">

              <User
                size={20}
                className="text-slate-400"
              />

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

            <label className="text-sm font-semibold text-slate-600 block mb-2">
              Password
            </label>

            <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-400 bg-slate-50">

              <Lock
                size={20}
                className="text-slate-400"
              />

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

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* REGISTER */}
        <div className="text-center mt-6">

          <p className="text-slate-500 text-sm sm:text-base">
            Don’t have an account?{" "}

            <span
              onClick={() => navigate("/register")}
              className="text-cyan-500 font-semibold cursor-pointer hover:text-cyan-600"
            >
              Register
            </span>

          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;