const ChatArea = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {/* AI message */}
        <div className="bg-white px-4 py-2 rounded-lg shadow w-fit">
          Hello! How can I help you?
        </div>

        {/* User message */}
        <div className="bg-black text-white px-4 py-2 rounded-lg shadow w-fit ml-auto">
          I want to build a MERN chatbot.
        </div>

      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
        />
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>

    </div>
  );
};

export default ChatArea;
