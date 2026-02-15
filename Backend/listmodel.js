require("dotenv").config();
const fetch = require("node-fetch"); // v2 works with require

async function listModels() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
  }
}

listModels();
