import { io } from "./WebSockets"
export class MessagesService {
    constructor() {

    }

    sendMessage = (Message, callback) => {
        console.log(Message);
    }
}