import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Paste your key here
const API_KEY = "AIzaSyDTn-o1HRKVKGhcvsjVC2yeXHL84ZN04Yk"; 
const genAI = new GoogleGenerativeAI(API_KEY);

const askBtn = document.getElementById("askBtn");
const userInput = document.getElementById("userInput");
const loader = document.getElementById("loader");
const responseContainer = document.getElementById("responseContainer");

async function getWisdom() {
    const question = userInput.value.trim();
    if (!question) return;

    // UI Reset
    loader.classList.remove("hidden");
    responseContainer.classList.add("hidden");

    try {
        // Use gemini-1.5-flash - it's the standard for 2026
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // The "Brain" - Prompt Engineering
        const prompt = `You are a scholar of Hindu philosophy. 
        Answer the following question using wisdom from Bhagavad Gita, Upanishads, or Vedas.
        
        Format your response as:
        VERSE: [A relevant verse or teaching]
        MEANING: [A simple explanation]
        PRACTICAL: [How to use this today]

        User Question: ${question}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Put the result into your boxes
        // If the parsing is too hard, we just show the whole text for now:
        document.getElementById("meaningText").innerText = text;
        
        loader.classList.add("hidden");
        responseContainer.classList.remove("hidden");

    } catch (error) {
        loader.classList.add("hidden");
        console.error("Connection Error:", error);
        alert("The connection failed. Please check if your API Key is correct in the code.");
    }
}

askBtn.addEventListener("click", getWisdom);

// Handle Enter Key
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        askBtn.click();
    }
});