const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../Mongo/chatmongo");

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in ENV");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message required" });
    }

    const result = await model.generateContent(message);

    let reply = "";

    if (result?.response?.text) {
      reply = result.response.text();
    } else if (
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text
    ) {
      reply =
        result.response.candidates[0].content.parts[0].text;
    } else {
      console.error("⚠️ Gemini raw response:", JSON.stringify(result, null, 2));
      throw new Error("No text from Gemini");
    }

    const chat = await Chat.create({
      user: req.user.id,
      userMessage: message,
      aiReply: reply,
    });

    res.json(chat);
  } catch (error) {
    console.error("🔥 GEMINI ERROR:", error.message);
    res.status(500).json({ error: "Gemini error", details: error.message });
  }
};

const chathistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    console.error("🔥 HISTORY ERROR:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { chatWithAI, chathistory };
