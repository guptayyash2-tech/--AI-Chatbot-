require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

require("./config/passport");

const userrouter = require("./Router/Userrouter");
const router = require("./Router/goggle");

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(passport.initialize());
app.get("/", (req, res) => {
  res.send("AI Chatbot Backend is Running 🚀");
});
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Temporary echo response
    return res.json({ reply: `You said: ${message}` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  }
});



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/api/user", userrouter);
app.use("/auth", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
