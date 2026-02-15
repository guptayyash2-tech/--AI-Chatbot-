import { useEffect, useState } from "react";
import { GetChatHistory, SendMessage } from "../Api";


const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load history on page load
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await GetChatHistory();

        const formatted = data.flatMap(chat => [
          { role: "ai", text: chat.aiReply },
          { role: "user", text: chat.userMessage }
        ]);

        setMessages(formatted);
      } catch (err) {
        console.error("History error:", err);
      }
    };

    loadHistory();
  }, []);

  // Send message
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
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg shadow w-fit max-w-[70%] ${
              msg.role === "ai"
                ? "bg-white"
                : "bg-black text-white ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-white px-4 py-2 rounded-lg shadow w-fit">
            AI is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
