import React, { useEffect, useState } from "react";
import "./App.css";
import { useUser } from "@clerk/clerk-react";
import { Chatroom } from "./components/Chatroom";
import axios from "axios"
import { Conversations } from "./components/Conversations";

export default function Main() {
    const { user } = useUser();
    const [conversations, setConversations] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3001/conversations/${user.id}`).then((response) => {
            if(response.data) {
                if(conversations == null) {
                    setConversations(response.data);
                }
            }
        }, [conversations])

        
    })

    return(
        <div>
            <h1>Welcome Back!</h1>
            <button>Create New Conversation</button>

            {conversations == null ? <h2>No Conversations!</h2> : <Conversations conversations={conversations} />}

        </div>
    );
}