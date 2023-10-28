import React from "react";
import "./App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Conversation,
    ConversationList,
} from "@chatscope/chat-ui-kit-react";
import { Typography } from "@mui/material";


export default function Main() {
    return (
        <>
            <nav style={{ height: '10vh' }}>
                <Typography variant="h2" px={2}>AngryChat</Typography>
            </nav>
            <MainContainer style={{ height: '90vh' }}>
                <ConversationList>
                    <Conversation name="Grant" lastSenderName="Grant" info="RAHHH I AM SO ANGRY!">

                    </Conversation>

                    <Conversation name="Luke" lastSenderName="Luke" info="I am going to hit you with my car.">

                    </Conversation>

                    <Conversation name="Ivan" lastSenderName="Ivan" info="i am so filled with rage!!!">

                    </Conversation>

                    <Conversation name="Noah" lastSenderName="Noah" info="its berserkin time....">

                    </Conversation>

                </ConversationList>
                <ChatContainer>
                    <MessageList>
                        <Message
                            model={{
                                message: "Here is a test message",
                                sentTime: "just now",
                                sender: "Joe",
                            }}
                        />
                    </MessageList>
                    <MessageInput placeholder="Type message here" />
                </ChatContainer>
            </MainContainer>
        </>

    );
}
