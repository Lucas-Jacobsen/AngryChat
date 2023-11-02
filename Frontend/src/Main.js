import React, { useEffect, useState } from "react";
import "./App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
} from "@chatscope/chat-ui-kit-react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Navbar from "./Navbar";


export default function Main() {

    // User that user is messaging
    const [focusedUser, setFocusedUser] = useState('');

    // List of user that user is friends with
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // Get backend stuff and set states
        setFocusedUser('');
        setUserList([
            {
                name: 'Grant'
            },
            {
                name: 'Luke'
            },
            {
                name: 'Ivan'
            },
            {
                name: 'Noah'
            },
        ]);
    }, [])

    return (
        <>
            <Navbar/>
            <MainContainer style={{ height: '90vh' }}>
                <Sidebar userList={userList} setFocusedUser={setFocusedUser}/>
                <Chat focusedUser={focusedUser}/>
            </MainContainer>
        </>

    );
}
