import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetMe, LogoutUser } from "../Api";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await GetMe();
        setUser(data);
      } catch (err) {
        // token invalid or expired
        LogoutUser();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    LogoutUser();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-2xl shadow-sm border p-8">

        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-6">Account</h1>

        {/* Profile Section */}
        <div className="space-y-4">

          {/* Name */}
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-base font-medium">{user?.name}</p>
          </div>

          {/* Email */}
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium">{user?.email}</p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
