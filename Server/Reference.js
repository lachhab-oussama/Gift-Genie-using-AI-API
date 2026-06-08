import OpenAI from "openai";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { checkEnvironment } from "./Utils/checkEnvironment.js";
import { messages } from "./systemMessage.js";

checkEnvironment();

// Initialize an OpenAI client for your provider using env vars
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true,
});


function start() {
  // Setup UI event listeners
  userInput.addEventListener("input", () => autoResizeTextarea(userInput));
  giftForm.addEventListener("submit", handleGiftRequest);
}

async function handleGiftRequest(e) {
  // Prevent default form submission
  e.preventDefault();


  // Add user message to global messages array
  messages.push({
    role: "user",
    content: `Generate fresh gift ideas for this new user request: ${userPrompt}`,
  });

  try {
    // Enable streaming in the chat completions request
    const stream = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
      stream: true,
    });

    // Accumulate the streamed response
    let giftSuggestions = "";

    // Iterate over streamed chunks as they arrive
    for await (const chunk of stream) {
      const chunkContent = chunk.choices[0]?.delta?.content;
      if (!chunkContent) continue;

      // Append to accumulated response
      giftSuggestions += chunkContent;

      // Convert Markdown to HTML progressively
      const html = marked.parse(giftSuggestions);

      // Sanitize the HTML to prevent XSS attacks
      const safeHTML = DOMPurify.sanitize(html);

      // Render progressively
      outputContent.innerHTML = safeHTML;
    }

    console.log(giftSuggestions);
  } catch (error) {
    console.error(error);

    // Display friendly error message
    outputContent.textContent =
      "Sorry, I can't access what I need right now. Please try again in a bit.";
  }
}

start();
