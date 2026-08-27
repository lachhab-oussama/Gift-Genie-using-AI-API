import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { messages } from '../Utils/systemMessage.js'
import { groq } from '../Utils/InitializeAiProvider.js'

async function getGroqChatCompletion() 
{
    return groq.chat.completions.create({
        messages,
        model: "openai/gpt-oss-20b",
    });
}

export const messageStream = async (req, res) => {

    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const userPrompt = String(req.query.userPrompt ?? '').trim();
    console.log(userPrompt);
    if (!userPrompt) {
        return res.status(400).json({ message: 'userPrompt is required' });
    }
    messages.push({
        role: "user",
        content: `Generate fresh gift ideas for this new user request: ${userPrompt}`,
    });

    try {
        const response = await getGroqChatCompletion();

        const content = response.choices[0]?.message?.content ?? '';
        const html = marked.parse(content);
        const safeHTML = DOMPurify.sanitize(html);
        return res.json({ safeHTML });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Sorry, I can't access what I need right now. Please try again in a bit."
        });
    }
}