import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetChatHistory } from "../Api";

const Sidebar = ({ onNewChat, onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const res = await GetChatHistory();
      setChats(res.data.reverse());
    } catch (err) {
      console.error("Failed to load chats");
    }
  };

  return (
    <div className="h-screen w-64 bg-[#202123] text-white flex flex-col border-r border-gray-700">
      
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onNewChat}
          className="w-full border border-gray-500 rounded-lg py-2 text-sm hover:bg-gray-700 transition"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-xs text-gray-400 mb-2">Your chats</p>

        <div className="space-y-2">
          {chats.map(chat => (
            <div
              key={chat._id}
              onClick={() => onSelectChat(chat)}
              className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer text-sm truncate transition"
            >
              {chat.userMessage.slice(0, 30)}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700 text-sm">
        <Link
          to="/account"
          className="hover:bg-gray-700 px-2 py-1 rounded block"
        >
          Your Account
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
