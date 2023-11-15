import React from "react";
import "../App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    Conversation,
    ConversationList,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import { useEffect, useState } from "react";
import InviteUser from "./InviteUser";


export default function Sidebar(props) {

    const [sidebar, setSidebar] = useState([])

    const baseURL = "https://angrychat-backend-98dcd3d26a9e.herokuapp.com"

    useEffect(() => {
        update();
        

    },[]);

    async function update() {
        await axios.get(baseURL + "/conversationByUser?user_id=" + props.user.id).then(async (results) => {
            var conversations =  results.data;
            console.log(results.data)
            setSidebar(conversations.map((user, index) => {
                return(
                    <Conversation onClick={() => props.setFocusedUser(user)} name={props.user.id === user.user_id ? user.recipient_name : user.user_name} lastSenderName={props.user.id === user.user_id ? user.recipient_name : user.user_name} info=" I AM SO ANGRY!"/>
                )
            }))
        })
    }

    

    return (
        <ConversationList>     
            {sidebar}
            <InviteUser user={props.user} setFocusedUser={props.setFocusedUser} update={update}></InviteUser>
        </ConversationList>
        
        
    );
}
