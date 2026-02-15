import React, { useEffect, useState } from "react";
import { GetMe, SetAuthToken } from "../Api";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8] p-6">
      <div className="bg-white w-[420px] rounded-2xl shadow-sm border p-8">

        <h1 className="text-2xl font-semibold mb-6 text-center">Account</h1>

        <div className="space-y-4">

          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-base font-medium">{user.name}</p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium">{user.email}</p>
          </div>

        </div>

        <Link
          to="/"
          className="block mt-6 text-center w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;
