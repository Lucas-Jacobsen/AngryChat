import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Typography, Stack, Box, Grid } from "@mui/material";

export default function Main(props) {

    // User that user is messaging
    const [focusedUser, setFocusedUser] = useState();

    // List of user that user is friends with
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        //If user does not exist in database, create user
        console.log(props.user)
        getUser();
    }, [])

    async function getUser() {
        console.log(props.user.primaryEmailAddress.emailAddress)
        if (props.user) {
            await axios.get("https://angrychat-backend-98dcd3d26a9e.herokuapp.com/users?email_address=" + props.user.primaryEmailAddress.emailAddress).then((results) => {
                console.log(results)
                console.log(results.data.length === 0)
                if (results.data.length === 0) {
                    axios.post("https://angrychat-backend-98dcd3d26a9e.herokuapp.com/users?user_id=" + props.user.id + "&email_address=" + props.user.primaryEmailAddress.emailAddress + "&firstName=" + props.user.firstName + "&lastName=" + props.user.lastName).then((results) => {
                        console.log(results)
                    })
                }
            });
        }
    }

    return (
        <Grid container style={{maxHeight: '100vh', overflow: 'hidden'}}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={3}>
                <Sidebar user={props.user} userList={userList} setFocusedUser={setFocusedUser} />
            </Grid>
            <Grid item xs={9} p={2}>
                {focusedUser === undefined ? 
                <Box style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant='h2'>No users selected...</Typography>
                    <Typography variant='subtitle1'>Maybe you should do something about that. Idiot.</Typography>
                </Box> 
                : <Chat user={props.user} focusedUser={focusedUser} />}
            </Grid>
        </Grid>
    );
}
