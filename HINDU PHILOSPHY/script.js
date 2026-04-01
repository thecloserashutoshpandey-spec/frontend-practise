import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDTn-o1HRKVKGhcvsjVC2yeXHL84ZN04Yk"; 
const genAI = new GoogleGenerativeAI(API_KEY);

const askBtn = document.getElementById("askBtn");
const userInput = document.getElementById("userInput");
const loader = document.getElementById("loader");
const responseContainer = document.getElementById("responseContainer");

async function getWisdom() {
    const question = userInput.value.trim();
    if (!question) return;

    loader.classList.remove("hidden")
    responseContainer.classList.add("hidden");

    try {

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        

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

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        askBtn.click();
    }
});