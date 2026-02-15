import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, SetAuthToken } from "../Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await LoginUser({ email, password });

      const token = data.token;

      localStorage.setItem("token", token);
      SetAuthToken(token);

      navigate("/chatpage");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8]">
      <div className="bg-white w-[380px] p-10 rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Welcome back
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-3 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
