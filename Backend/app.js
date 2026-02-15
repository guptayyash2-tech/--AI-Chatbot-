require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userrouter = require("./Router/Userrouter");

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use("/api/user", userrouter);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
