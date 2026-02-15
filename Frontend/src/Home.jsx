import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-6">
      
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center space-y-8">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-white tracking-tight">
          AI Chat Assistant
        </h1>
        <p className="text-gray-300 text-sm">
          Your personal AI assistant. Ask anything, anytime.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/register"
            className="w-full py-3 rounded-xl font-semibold bg-green-500 text-white
              hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-2xl"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="w-full py-3 rounded-xl font-semibold bg-emerald-500 text-white
              hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-2xl"
          >
            Login
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400">
          Built with ❤️ using React, Tailwind & AI
        </p>
      </div>
    </div>
  );
};

export default Home;
