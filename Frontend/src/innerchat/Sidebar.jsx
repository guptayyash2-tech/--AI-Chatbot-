import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#202123] text-white flex flex-col">
      
      {/* New Chat */}
      <div className="p-4 border-b border-gray-700">
        <button className="w-full border border-gray-500 rounded-lg py-2 text-sm hover:bg-gray-700">
          + New Chat
        </button>
      </div>

      {/* Your Chats */}
      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-xs text-gray-400 mb-2">Your chats</p>

        <div className="space-y-2">
          <div className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer text-sm">
            React help
          </div>
         
        </div>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-700 text-sm">
       <Link to="/account" className="w-full text-left hover:bg-gray-700 px-2 py-1 rounded">Your Account</Link>
      </div>
    </div>
  );
};

export default Sidebar;
