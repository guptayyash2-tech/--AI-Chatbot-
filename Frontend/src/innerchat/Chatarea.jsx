import { useEffect, useState } from "react";
import { GetChatHistory, SendMessage } from "../Api";

const ChatArea = ({ activeChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeChat === "new") {
      setMessages([]);
      return;
    }

    if (activeChat && activeChat !== "new") {
      setMessages([
        { role: "user", text: activeChat.userMessage },
        { role: "ai", text: activeChat.aiReply },
      ]);
      return;
    }

    const loadHistory = async () => {
      try {
        const { data } = await GetChatHistory();
        const formatted = data.flatMap(chat => [
          { role: "user", text: chat.userMessage },
          { role: "ai", text: chat.aiReply },
        ]);
        setMessages(formatted);
      } catch (err) {
        console.error("History error:", err);
      }
    };

    loadHistory();
  }, [activeChat]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await SendMessage(input);
      const aiMsg = { role: "ai", text: data.aiReply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "⚠️ Server error. Try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#343541] text-white">

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-2xl shadow w-fit max-w-[75%] text-sm ${
              msg.role === "ai"
                ? "bg-[#444654]"
                : "bg-[#19c37d] text-black ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-[#444654] px-4 py-2 rounded-lg shadow w-fit">
            AI is typing...
          </div>
        )}
      </div>

      <div className="p-4 bg-[#40414f] border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-[#343541] border border-gray-600 rounded-lg px-3 py-2 text-white outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-[#19c37d] text-black px-4 py-2 rounded-lg font-medium hover:opacity-80"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
