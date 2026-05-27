import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    profileImageUrl: "",
    resumeUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");

      setUser({
        username: res.data.username || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        profileImage: res.data.profileImageUrl || "",
        resumeUrl: res.data.resumeUrl || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // UPLOAD FILE
  const uploadFile = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const res = await API.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };

  // UPDATE PROFILE
  const updateProfile = async () => {
    setLoading(true);

    try {
      let updatedData = { ...user };

      // IMAGE
      if (imageFile) {
        const imageUrl = await uploadFile(imageFile);
        updatedData.profileImageUrl = imageUrl;
      }

      // RESUME
      if (resumeFile) {
        const resumeUrl = await uploadFile(resumeFile);
        updatedData.resumeUrl = resumeUrl;
      }

      await API.put("/profile", updatedData);

      fetchProfile();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // USER INITIAL
  const getInitial = (email) => {
    if (!email) return "U";

    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Manage your account information and resume
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* TOP SECTION */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-32"></div>

        <div className="px-5 sm:px-8 pb-8">
          {/* PROFILE IMAGE */}
          <div className="-mt-16 flex flex-col sm:flex-row sm:items-end gap-5">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="profile"
                className="w-32 h-32 rounded-full border-[5px] border-white object-cover shadow-lg bg-white"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-[5px] border-white bg-slate-800 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
                {getInitial(user.email)}
              </div>
            )}

            <div className="pb-2">
              <h2 className="text-2xl font-bold text-slate-800">
                {user.username || "User"}
              </h2>

              <p className="text-slate-500 break-all">
                {user.email || "No Email"}
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {/* USERNAME */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Username
              </label>

              <input
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Email
              </label>

              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Phone Number
              </label>

              <input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* PROFILE IMAGE */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border border-slate-300 bg-slate-50 p-2 rounded-xl cursor-pointer"
              />
            </div>

            {/* RESUME */}
            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-2">
                Upload Resume
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full border border-slate-300 bg-slate-50 p-2 rounded-xl cursor-pointer"
              />
            </div>
          </div>

          {/* RESUME VIEW */}
          {user.resumeUrl && (
            <div className="mt-6">
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 transition text-white px-5 py-3 rounded-xl font-semibold shadow-md"
              >
                View Resume
              </a>
            </div>
          )}

          {/* SAVE BUTTON */}
          <div className="mt-8">
            <button
              onClick={updateProfile}
              disabled={loading}
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 transition text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
