const express = require('express');
const Userregister = require('../Controller/Userlogin');
const chatWithAI = require('../Openai/openai');
const adminprotect = require('../Midllewear/Usermiddle');
const userrouter = express.Router();

userrouter.post("/register",Userregister);
userrouter.post("/chatapi",adminprotect,chatWithAI.chatWithAI);
userrouter.get("/chat/history",adminprotect,chatWithAI.chathistory)

module.exports = userrouter;