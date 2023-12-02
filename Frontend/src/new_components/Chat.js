import { useState } from "react";
import {io} from "socket.io-client"

import { useEffect } from "react";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import gptMessageService from "../services/gptMessageService";
import { Stack, Box, Typography, TextField, IconButton, CircularProgress } from '@mui/material';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import '../index.css';

export default function Chat(props) {

    const [input, setInput] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const socket = io("https://angrychat-backend-98dcd3d26a9e.herokuapp.com");

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
    }, [])

    function formatMessage(message) {
        let formattedMessage = {
            message: message.text,
            sentTime: "just now",
            sentByUser: message.user_id === props.user.id ? true : false,
            position: "normal",
            id: message.id
        }
        return formattedMessage;
    }

    function load() {
        if (props.focusedUser) {
            let endRequest = props.user.id === props.focusedUser.user_id ? props.focusedUser.user_id + "&recipient_id=" + props.focusedUser.recipient_id : props.focusedUser.recipient_id + "&recipient_id=" + props.focusedUser.user_id
            let request = "https://angrychat-backend-98dcd3d26a9e.herokuapp.com/conversation?user_id=" + endRequest

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

    // Implement this when Frontend is connected to Backend
    const handleSend = async (message) => {
        // Begin load state
        setLoading(true);

        // Handle send message logic
        let endRequest = props.user.id === props.focusedUser.user_id ? props.focusedUser.recipient_id : props.focusedUser.user_id
        
        // Translates message to angry
        const translatedMessage = await gptMessageService.translateMessage(message);
        
        // Sends to API
        axios.post("https://angrychat-backend-98dcd3d26a9e.herokuapp.com/messages?text=" + translatedMessage + "&user_id=" + props.user.id + "&recipient_id=" + endRequest).then((results) => {
            console.log(results)
        })
        let socketMessage = {"text": translatedMessage, "user_id": props.user.id, "recipient_id": props.recipient_id};
        socket.emit("message", socketMessage);

        // End load state
        load();
        setLoading(false);
        setInput('');
    }

    function deleteMessage(event) {
        console.log(event.target.id)
        axios.delete("https://angrychat-backend-98dcd3d26a9e.herokuapp.com/messages?id=" + event.target.id).then(() => {
            load();
        });
    }

    const messageList = messages.map((message) => {
        return (<Box style={{width: '100%'}}>
            <Box style={{...styles.message, ...(message.sentByUser ? styles.outgoing : styles.incoming)}}>
                <Typography p={1} variant='subtitle1'>{message.message}</Typography>
            </Box>
        </Box>)
    });

    return (
        <Box style={{height: '100vh'}}>
            {/* 
                This is supposed to be a styled scrollbar but its not working. 
                TODO: figure it out later 
            */}
            <SimpleBar>
                <Stack spacing={2} style={{maxHeight: '80vh', height: '80vh', overflow: 'auto'}} direction='column'>
                    {messageList}
                </Stack>
            </SimpleBar>
            <Stack spacing={2} sx={{backgroundColor: '#000000'}} style={{height: '10vh', alignItems: 'center'}} direction='row'>
                <TextField 
                    value={input}
                    disabled={isLoading ? true : false} 
                    style={{width: '90%'}} 
                    placeholder="Enter a message" 
                    onChange={(event) => {setInput(event.target.value)}}
                    onKeyDown={(event) => {
                        if(event.key === "Enter"){
                            handleSend(input)
                        }
                    }}
                />
                {isLoading ? <CircularProgress/> : <IconButton style={{width: 50, height: 50}} onClick={() => handleSend(input)}>
                    <SendIcon/>    
                </IconButton>}
            </Stack>
        </Box>
    );
}

const styles = {
    message: {
        borderRadius: 5,
        maxWidth: '75%'
    },
    outgoing: {
        float: 'right',
        background: 'linear-gradient(to bottom, orange, red)',
    },
    incoming: {
        float: 'left',
        backgroundColor: 'grey'
    }
}
