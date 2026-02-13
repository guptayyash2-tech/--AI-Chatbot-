import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";

const ChatPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatPage;
