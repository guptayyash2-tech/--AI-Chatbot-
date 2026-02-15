const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../Mongo/chatmongo");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const chatWithAI = async (req, res) => {
  try {
    console.log("STEP 1: Body =", req.body);
    console.log("STEP 2: User =", req.user);

    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message" });

    console.log("STEP 3: Sending to Gemini...");

    const result = await model.generateContent(message);

    console.log("STEP 4: Gemini result =", JSON.stringify(result, null, 2));

    const reply = result.response.text();

    console.log("STEP 5: Reply =", reply);

    const chat = await Chat.create({
      user: req.user._id,
      userMessage: message,
      aiReply: reply
    });

    console.log("STEP 6: Saved");

    res.json(chat);

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const chathistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { chatWithAI, chathistory };
