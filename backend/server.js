// backend/server.js
import express from "express";
import cors from "cors";
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

app.post("/generateHint", async (req, res) => {
  const { problem } = req.body;
  const prompt = `Provide hints for the following LeetCode problem. 
Problem Title: ${problem.title}
Problem Description: ${problem.description}
Do NOT give the full solution, just hints.`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({ hint: result.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ hint: "Error generating hint" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
