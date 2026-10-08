require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/ask", async (req, res) => {
  const message = req.body.message;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: message,
  });

  res.json({
    answer: response.text,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});