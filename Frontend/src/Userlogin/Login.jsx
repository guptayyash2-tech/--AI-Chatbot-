const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8]">
      <div className="bg-white w-[380px] p-10 rounded-2xl shadow-md text-center">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-3">
          Log in or sign up
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-6">
          You’ll get smarter responses and can upload files, images, and more.
        </p>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition">
          
          {/* Google Icon */}
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />

          <span className="text-sm font-medium">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4"
        />

        {/* Continue Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
          Continue
        </button>

      </div>
    </div>
  );
};

export default LoginPage;
