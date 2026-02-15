const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../Mongo/chatmongo");

// init once
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing in environment");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// stable production model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    let reply = null;

    // retry up to 3 times
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await model.generateContent(message);
        reply = result?.response?.text?.();

        if (!reply) throw new Error("Empty AI response");
        break;
      } catch (err) {
        console.error(`⚠ Gemini attempt ${attempt} failed:`, err.message);
        if (attempt === 3) throw err;
        await sleep(1200);
      }
    }

    const chat = await Chat.create({
      user: req.user._id,
      userMessage: message,
      aiReply: reply,
    });

    res.json(chat);

  } catch (error) {
    console.error("🔥 Gemini Controller Error:", error.message);
    res.status(500).json({
      error: "AI is busy. Please try again in a moment.",
    });
  }
};

const chathistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .sort({ createdAt: 1 })
      .lean();

    res.json(chats);
  } catch (err) {
    console.error("❌ Chat history error:", err.message);
    res.status(500).json({ error: "Failed to load chat history" });
  }
};

module.exports = { chatWithAI, chathistory };
