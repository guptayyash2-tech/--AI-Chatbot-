import React, { useEffect, useState } from "react";
import { GetMe, SetAuthToken } from "../Api";
import { Link, useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) SetAuthToken(token);

    const fetchUser = async () => {
      try {
        const { data } = await GetMe();
        setUser(data.user ?? data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load account");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-indigo-600 font-medium animate-pulse">
        Loading account...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold bg-red-50 py-3 px-4 rounded-xl inline-block">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6">
  <div className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

    {/* Header */}
    <div className="text-center mb-8">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg">
        {user.name[0]}
      </div>
      <h1 className="text-2xl font-semibold mt-4">Your Account</h1>
      <p className="text-sm text-gray-300">Manage your profile</p>
    </div>

    {/* Info */}
    <div className="space-y-4">
      <div className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition">
        <p className="text-xs text-gray-300">Name</p>
        <p className="text-lg font-medium">{user.name}</p>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition">
        <p className="text-xs text-gray-300">Email</p>
        <p className="text-lg font-medium">{user.email}</p>
      </div>
    </div>

    {/* Actions */}
    <div className="mt-8 space-y-3">
      <Link
        to="/chat"
        className="block text-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition"
      >
        Back to Chat
      </Link>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500/80 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
</div>

  );
};

export default AccountPage;
