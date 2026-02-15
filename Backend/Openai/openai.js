const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../Mongo/chatmongo");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// stable model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro"
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message" });

    let reply;

    // retry 3 times if Gemini is busy
    for (let i = 0; i < 3; i++) {
      try {
        const result = await model.generateContent(message);
        reply = result.response.text();
        break;
      } catch (err) {
        console.error(`Gemini attempt ${i + 1} failed`);
        if (i === 2) throw err;
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    const chat = await Chat.create({
      user: req.user._id,
      userMessage: message,
      aiReply: reply
    });

    res.json(chat);

  } catch (error) {
    console.error("🔥 Gemini Error:", error.message);
    res.status(500).json({
      error: "AI is busy. Please try again."
    });
  }
};

const chathistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(chats);
  } catch {
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { chatWithAI, chathistory };
