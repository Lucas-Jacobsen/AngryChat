import React, { useEffect, useState } from "react";
import "../App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
} from "@chatscope/chat-ui-kit-react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Navbar from "./Navbar";
import axios from "axios";


export default function Main(props) {

    // User that user is messaging
    const [focusedUser, setFocusedUser] = useState('');

    // List of user that user is friends with
    const [userList, setUserList] = useState([]);

    const baseURL = "https://angrychat-backend-98dcd3d26a9e.herokuapp.com/"

    useEffect(() => {
        //If user does not exist in database, create user
        console.log(props.user)
        getUser();

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
    },[])

    async function getUser() {
        console.log(props.user.primaryEmailAddress.emailAddress)
        if (props.user) {
            await axios.get(baseURL + "/users?email_address=" + props.user.primaryEmailAddress.emailAddress).then((results) => {
                console.log(results)
                console.log(results.data.length === 0)
                if (results.data.length === 0) {
                    axios.post(baseURL + "/users?user_id=" + props.user.id + "&email_address=" + props.user.primaryEmailAddress.emailAddress + "&firstName=" + props.user.firstName + "&lastName=" + props.user.lastName).then((results) => {
                        console.log(results)
                    })

                }
            });

        }
    }

    return (
        <>
            <Navbar />
            <MainContainer style={{ height: '90vh' }}>
                <Sidebar user={props.user} userList={userList} setFocusedUser={setFocusedUser} />
                {focusedUser === null ? <div></div> : <Chat user={props.user} focusedUser={focusedUser} />}
            </MainContainer>
        </>

    );
}
