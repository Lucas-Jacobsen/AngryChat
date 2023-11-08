import React, { useState } from "react";
import "../App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    MessageGroup
} from "@chatscope/chat-ui-kit-react";
import { useEffect } from "react";
import axios from "axios";


export default function Chat(props) {

    // const [messages, setMessages] = useState(props.focusedUser.messages);
    useEffect(() => {
        update();
    }, [props]);

    function update() {
        if (props.focusedUser) {
            console.log(props.focusedUser)
            let endRequest = props.user.id == props.focusedUser.user_id ? props.focusedUser.user_id + "&recipient_id=" + props.focusedUser.recipient_id : props.focusedUser.recipient_id + "&recipient_id=" + props.focusedUser.user_id
            let request = "http://localhost:3000/conversation?user_id=" + endRequest
            axios.get(request).then((results) => {
                console.log(results)
                let tempMessages = []
                results.data.forEach((message) => {
                    tempMessages.push({
                        message: message.text,
                        sentTime: "just now",
                        direction: message.user_id == props.user.id ? "outgoing" : "incoming",
                        position: "normal",
                        id: message.id
                    })
                })
                console.log(tempMessages)
                setMessages(tempMessages)
            })
        }
    }

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
        console.log(props.message)
        let endRequest = props.user.id == props.focusedUser.user_id ? props.focusedUser.recipient_id : props.focusedUser.user_id
        axios.post("http://localhost:3000/messages?text=" + message + "&user_id=" + props.user.id + "&recipient_id=" + endRequest).then((results) => {
            console.log(results)
            update();
        })
    }

    function deleteMessage(event) {
        console.log(event.target.id)
        axios.delete("http://localhost:3000/messages?id=" + event.target.id).then(() => {
            update();
        });
    }

    

    return (
        <MainContainer style={{ height: '90vh', width: '100%' }}>
            <ChatContainer>
                <MessageList>
                    {/* {messageList} */}
                    {messages.map((message) => {
                        return (
                            <div>
                            <MessageGroup direction={message.direction}>
                            <MessageGroup.Messages>
                            <Message
                                model={message}
                            />
                            </MessageGroup.Messages>
                            {message.direction == "outgoing" ? <MessageGroup.Footer direction={message.direction}><div className="message"><button className="message" onClick={deleteMessage} id={message.id}>delete</button></div></MessageGroup.Footer> : ""}
                            
                            </MessageGroup>
                            </div>
                        )
                    })}
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
