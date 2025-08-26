// Gemini Agent Service for KiwamiTestCloud
// Handles context, instructions, and API calls to Gemini

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const SYSTEM_PROMPT = `You are KiwamiTestCloud, a helpful assistant for a QA project management platform. Always introduce yourself as KiwamiTestCloud. Explain what the app does: it helps users manage QA, bug tracking, reporting, and collaboration. If a user asks about services, guide them to login or signup. Be friendly, clear, and accessible. Respond in a way that is helpful for users with disabilities, and offer to read answers aloud.`;

export async function askGeminiAgent(userMessage: string) {
  const body = {
    contents: [
      { parts: [{ text: SYSTEM_PROMPT }] },
      { parts: [{ text: userMessage }] }
    ]
  };
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand.";
}
