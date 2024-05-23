import 'dotenv/config'
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: "You are a helpful assistant, answer any questions to the best of your ability" },
        { role: "user", content: "what was my last question i asked?" },
    ],
});

console.log(response);
console.log(response.choices[0].message.content);

