import { openai } from "./openai";
import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const newMessage = async (history: any, message: any) => {
	const results = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [...history, message],
	});
	return results.choices[0].message;
};

const formatMessage = (userInput: string) => ({
	role: "user",
	content: userInput,
});

const chat = async () => {
    const history = [        { role: "system", content: "You are a helpful assistant, answer any questions to the best of your ability" },];
    const message = formatMessage("Hello, how are you?");
 const start = async () => {
    rl.question('you:', async(userInput) =>{
        if(userInput === 'exit'){
            rl.close();
            return;
        }
        const message = formatMessage(userInput);
        const response = await newMessage(history, message);
        history.push(message, response);
        console.log(`\n\nAssistant: ${response.content}`);

        start();
    })
 }
 start();
}

console.log('system is starting ..., type "exit" to stop');
chat()
// export const chat = async (message: string) => {
//     const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             { role: "system", content: "You are a helpful assistant." },
//             { role: "user", content: message },
//         ],
//     });
//     return response.choices[0].message.content;
// };
