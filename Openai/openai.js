const { GoogleGenerativeAI } = require("@google/generative-ai");
const chatmongo = require("../Mongo/chatmongo");

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

// ✅ Use latest supported text model
const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview"
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // 1. Get AI reply
    const result = await model.generateContent(message);
    const reply = result.response.text();

    // 2. Save to MongoDB
    const chat = await chatmongo.create({
      userMessage: message,
      aiReply: reply
    });

    // 3. Send response once
    res.json(chat);

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      error: "Gemini API error",
      details: error.message
    });
  }
};


const chathistory = async (req, res) => {
  try {
    const chats = await chatmongo.find().sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({
        error: "Database error",
        details: error.message
    });
}
};

module.exports = { chatWithAI, chathistory }    ;

