const express = require("express");
const { Userregister, Userlogin } = require("../Controller/Userlogin");

const adminprotect = require("../Midllewear/Usermiddle");
const { chatWithAI, chathistory } = require("../Openai/openai");


const userrouter = express.Router();

// AUTH
userrouter.post("/register", Userregister);
userrouter.post("/login", Userlogin);

// CHAT (protected)
userrouter.post("/chatapi", adminprotect, chatWithAI);
userrouter.get("/chat/history", adminprotect, chathistory);

module.exports = userrouter;
