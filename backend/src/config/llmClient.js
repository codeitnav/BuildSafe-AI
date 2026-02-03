import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("FATAL ERROR: GROQ_API_KEY is not defined in your .env file.");
  process.exit(1);
}

const llmClient = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1"
});

export default llmClient;