import React from "react";
import "./App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    Conversation,
    ConversationList,
} from "@chatscope/chat-ui-kit-react";


export default function Sidebar(props) {

    const sidebar = props.userList.map((user) => {
        return(
            <Conversation onClick={() => props.setFocusedUser(user)} name={user.name} lastSenderName={user.name} info="RAHHH I AM SO ANGRY!"/>
        )
    })

    return (
        <ConversationList>            
            {sidebar}
        </ConversationList>
    );
}
