import ChatArea from "./Chat";
import Sidebar from "./Sidebar";

import { useState } from "react";

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);

  const handleNewChat = () => {
    setActiveChat("new");
  };

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
  };

  return (
    <div className="flex h-screen bg-[#343541]">
      <Sidebar
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />

      <div className="flex-1">
       <ChatArea activeChat={activeChat} />
      </div>
    </div>
  );
};

export default ChatPage;
