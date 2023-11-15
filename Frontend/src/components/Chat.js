import React, { useState } from "react";
import "../App.css";
import {io} from "socket.io-client"
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
import gptMessageService from "../services/gptMessageService";

export default function Chat(props) {


    const socket = io("http://localhost:3002");
    const baseURL = "https://angrychat-backend-98dcd3d26a9e.herokuapp.com";

    useEffect(() => {
        const room = 1;
        socket.emit("join", room);
        load();
    }, [props.focusedUser]);

    useEffect(() => {
        
        socket.on("message", (data) => {
            data = formatMessage(data);
            console.log(data)
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(messages)
        });
    },[])

    function formatMessage(message) {
        let formattedMessage = {
            message: message.text,
            sentTime: "just now",
            direction: message.user_id === props.user.id ? "outgoing" : "incoming",
            position: "normal",
            id: message.id
        }
        return formattedMessage;
    }

    function load() {
        if (props.focusedUser) {
            let endRequest = props.user.id === props.focusedUser.user_id ? props.focusedUser.user_id + "&recipient_id=" + props.focusedUser.recipient_id : props.focusedUser.recipient_id + "&recipient_id=" + props.focusedUser.user_id
            let request = baseURL + "/conversation?user_id=" + endRequest

            axios.get(request).then((results) => {
                let tempMessages = []
                results.data.forEach((message) => {
                    tempMessages.push(formatMessage(message));
                })
                setMessages(tempMessages)
                console.log(messages);
            })
        }
    }


    const [messages, setMessages] = useState([]);

    // Implement this when Frontend is connected to Backend
    const handleSend = async (message) => {
        // Handle send message logic
        let endRequest = props.user.id === props.focusedUser.user_id ? props.focusedUser.recipient_id : props.focusedUser.user_id
        
        // Translates message to angry
        const translatedMessage = await gptMessageService.translateMessage(message);
        
        // Sends to API
        axios.post(baseURL + "/messages?text=" + translatedMessage + "&user_id=" + props.user.id + "&recipient_id=" + endRequest).then((results) => {
            console.log(results)
        })
        let socketMessage = {"text": translatedMessage, "user_id": props.user.id, "recipient_id": props.recipient_id};
        socket.emit("message", socketMessage);
    }

    function deleteMessage(event) {
        console.log(event.target.id)
        axios.delete(baseURL +"/messages?id=" + event.target.id).then(() => {
            load();
        });
    }

    return (
        <MainContainer style={{ height: '90vh', width: '100%' }}>
            <ChatContainer>
                <MessageList>
                    {messages.map((message) => {
                        return (
                        <>
                            <MessageGroup direction={message.direction}>
                                <MessageGroup.Messages>
                                    <Message
                                        model={message}
                                    />
                                </MessageGroup.Messages>
                                {message.direction === "outgoing" ? <MessageGroup.Footer direction={message.direction}><div className="message"><button className="message" onClick={deleteMessage} id={message.id}>delete</button></div></MessageGroup.Footer> : ""}
                                
                            </MessageGroup>
                        </>
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
