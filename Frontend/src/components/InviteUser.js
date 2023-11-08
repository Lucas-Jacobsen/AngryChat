import React from "react";
import "../App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    Conversation,
    ConversationList,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";


export default function InviteUser(props) {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [names, setNames] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/getAllUsers").then((result) => {
            let tempUsers = [];
            setUsers(result.data)
            result.data.forEach(element => {
                tempUsers.push(element.firstName + " " + element.lastName)
            });
            setNames(tempUsers)
        })
    }, [])

    function userChange(event) {
        setUser(event.target.innerHTML)
        setUser(users[event.target.dataset.optionIndex])
    }

    async function startChat() {
        console.log(props.user.fullName)
        await axios.post("http://localhost:3000/conversation?user_id=" + props.user.id + "&recipient_id="  + user.user_id + "&user_name=" + props.user.fullName +  "&recipient_name=" + user.firstName + " " + user.lastName).then((results) => {
            console.log(results)
            props.setFocusedUser(user);
            props.update()
        })
    }

    return (
        <div>
            <Autocomplete
            disablePortal
            id="combo-box"
            options={names}
            sx={{ width: 300 }}
            onChange={userChange}
            renderInput={(params) => <TextField {...params} label="Users" />}
            />
            <div className="center"><button className="message" onClick={startChat}>Start Chat</button></div>
        </div>
    )
}