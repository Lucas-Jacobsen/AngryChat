import React, { useState } from "react";
import "./App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";


export default function Chat(props) {

    // const [messages, setMessages] = useState(props.focusedUser.messages);
    const [messages, setMessages] = useState([]);

    // Implement this when Frontend is connected to Backend
    // const messageList = messages.map((message) => {
    //     return(
    //     <Message
    //          Replace these with the naming conventions of the API
    //         model={{
    //             message: message.content,
    //             sentTime: message.sendTime,
    //             sender: props.focusedUser,
    //         }}
    //     />)
    // })

    // Implement this when Frontend is connected to Backend
    const handleSend = async (message) => {
        // Handle send message logic
    }

    return (
        <MainContainer style={{ height: '90vh', width: '100%' }}>
            <ChatContainer>
                <MessageList>
                    {/* {messageList} */}
                    <Message
                        model={{
                            message: "My name is " + props.focusedUser.name + " and I hate you.",
                            sentTime: "just now",
                            sender: props.focusedUser,
                        }}
                    />
                </MessageList>
                <MessageInput
                    placeholder="Type message here"
                    attachButton={false}
                    onSend={(textContent) => handleSend(textContent)}
                />
            </ChatContainer>
        </MainContainer>
    );
}
