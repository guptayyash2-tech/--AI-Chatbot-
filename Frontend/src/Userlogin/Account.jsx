const AccountPage = () => {
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
            <p className="text-base font-medium">John Doe</p>
          </div>

          {/* Email */}
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium">john@example.com</p>
          </div>

        </div>

        {/* Logout */}
        <button className="mt-6 w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
