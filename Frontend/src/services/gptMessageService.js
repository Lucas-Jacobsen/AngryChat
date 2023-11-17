// OpenAI & .env imports
import OpenAI from 'openai';

// OpenAI API configuration
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true
});

// Service that handles recipe CRUD functionality
const gptMessageService = {

    //  Translates message to be ANGRY!
    translateMessage: async (message) => {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Please rewrite the following message into an angry chat: ${message}.
                        You may not use swear words, but the usage of comical insults is encouraged.
                        Make sure not to respond to the message, rather, rewrite the message into something new.`
                }
            ]
        })
        return completion.choices[0].message.content;
    },
}
export default gptMessageService;
