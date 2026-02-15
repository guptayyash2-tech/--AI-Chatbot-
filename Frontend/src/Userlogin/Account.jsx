import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  GetMe from "../Api";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await GetMe();
        setUser(data);
      } catch (err) {
        navigate("/login");
      }

    };
    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    
    navigate("/login");
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-2xl shadow-sm border p-8">
        <h1 className="text-2xl font-semibold mb-6">Account</h1>

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

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
