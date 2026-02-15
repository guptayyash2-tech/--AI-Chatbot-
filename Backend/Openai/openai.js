const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../Mongo/chatmongo");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const result = await model.generateContent(message);
    const reply = result.response.text();

    const chat = await Chat.create({
      user: req.user._id,
      userMessage: message,
      aiReply: reply
    });

    res.json(chat);
  } catch (error) {
    console.error("🔥 Gemini Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const chathistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { chatWithAI, chathistory };
