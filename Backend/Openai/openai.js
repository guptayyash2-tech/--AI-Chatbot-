const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../Mongo/chatmongo");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const chatWithAI = async (req, res) => {
  try {
    console.log("➡️ Chat request:", req.body);
    console.log("➡️ User:", req.user);

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const result = await model.generateContent(message);

    if (!result || !result.response) {
      throw new Error("Gemini returned empty response");
    }

    const reply = result.response.text();
    console.log("🤖 Gemini reply:", reply);

    const chat = await Chat.create({
      user: req.user.id,
      userMessage: message,
      aiReply: reply
    });

    res.json(chat);

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    console.error("🔥 MESSAGE:", error.message);
    console.error("🔥 STACK:", error.stack);

    res.status(500).json({
      error: "Gemini API failed",
      message: error.message,
      stack: error.stack
    });
  }
};

const chathistory = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const chats = await Chat.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.json(chats);

  } catch (error) {
    console.error("🔥 DB ERROR:", error);
    res.status(500).json({
      error: "Database error",
      message: error.message
    });
  }
};

module.exports = { chatWithAI, chathistory };
