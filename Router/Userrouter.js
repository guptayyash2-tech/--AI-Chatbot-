const express = require('express');
const Userregister = require('../Controller/Userlogin');
const chatWithAI = require('../Openai/openai');
const userrouter = express.Router();

userrouter.post("/register",Userregister);
userrouter.post("/chatapi",chatWithAI.chatWithAI);
userrouter.get("/chat/history",chatWithAI.chathistory)

module.exports = userrouter;