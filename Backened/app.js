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
app.get("/api/chat", (req, res) => {
  res.json({ reply: "Chat route working" });
});
app.post("/api/chat", (req, res) => {
  res.json({ reply: "Chat route working" });
});



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/api/user", userrouter);
app.use("/auth", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
