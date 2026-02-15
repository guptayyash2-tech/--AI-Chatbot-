const express = require("express");
const { Userregister, Userlogin } = require("../Controller/Userlogin");


const { chatWithAI, chathistory } = require("../Openai/openai");
const protect = require("../Midllewear/Usermiddle");


const userrouter = express.Router();

// AUTH
userrouter.post("/register", Userregister);
userrouter.post("/login", Userlogin);

// CHAT (protected)
userrouter.post("/chatapi", protect, chatWithAI);
userrouter.get("/chat/history", protect, chathistory);

module.exports = userrouter;
