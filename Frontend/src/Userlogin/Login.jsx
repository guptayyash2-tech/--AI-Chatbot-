import { useState } from "react";
import { GoogleLogin, LoginUser } from "../Api";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await LoginUser({ email, password });

      // save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful 🎉");

    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8]">
      <div className="bg-white w-[380px] p-10 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-3">Log in or sign up</h1>

        <p className="text-sm text-gray-500 mb-6">
          You’ll get smarter responses and can upload files, images, and more.
        </p>

        {/* Google Button */}
        <button
          onClick={GoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium"
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
