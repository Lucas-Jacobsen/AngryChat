// OpenAI & .env imports
import env from '../env.json'
import OpenAI from 'openai';

// OpenAI API configuration
const openai = new OpenAI({
    apiKey: env['OPENAI_API_KEY'],
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
                    content: `Please translate the following message into an angry chat: ${message}.
                        You may not use swear words, but the usage of comical insults is encouraged.`
                }
            ]
        })
        return completion.choices[0].message.content;
    },
}
export default gptMessageService;
