import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegisterUser, SetAuthToken } from "../Api";

const RegisterPage = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await RegisterUser({ name,email, password });

      const { token } = res.data;

      // save token
      localStorage.setItem("token", token);

      // set axios header
      SetAuthToken(token);

      alert("Registration successful 🎉");

      navigate("/"); // go to home
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8]">
      <div className="bg-white w-[380px] p-10 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-3">Create your account</h1>

        <p className="text-sm text-gray-500 mb-6">
          Join now to start chatting with AI and explore features.
        </p>

        <input
  type="text"
  placeholder="Full name"
  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-4"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
