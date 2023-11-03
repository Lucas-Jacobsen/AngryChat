import React from "react";
import "./App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    Conversation,
    ConversationList,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Sidebar(props) {

    const [sidebar, setSidebar] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/conversationByUser?user_id=" + props.user.id).then((results) => {
        var conversations =  results.data;
        console.log("here")
        console.log(results.data)
            setSidebar(conversations.map((user) => {
                return(
                    <Conversation onClick={() => props.setFocusedUser(user)} name={user.recipient_name} lastSenderName={user.recipient_name} info="RAHHH I AM SO ANGRY!"/>
                )
            }))
        })
        

    }, []);

    return (
        <ConversationList>     
            {sidebar}
        </ConversationList>
    );
}
