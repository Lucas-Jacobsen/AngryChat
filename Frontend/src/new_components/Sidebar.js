import axios from "axios";
import { useEffect, useState } from "react";
import InviteUser from "./InviteUser";
import { Divider, Stack, Box, Button, CardActionArea } from "@mui/material";
import Nameplate from "./Nameplate";


export default function Sidebar(props) {

    const [sidebar, setSidebar] = useState([])

    useEffect(() => {
        update();
    }, []);

    async function update() {
        await axios.get("https://angrychat-backend-98dcd3d26a9e.herokuapp.com/conversationByUser?user_id=" + props.user.id).then(async (results) => {
            var conversations =  results.data;
            console.log(results.data)
            setSidebar(conversations.map((user) => {
                return(
                    <CardActionArea key={user.id} onClick={() => props.setFocusedUser(user)}>
                        <Divider/>
                        <Nameplate name={props.user.id === user.user_id ? user.recipient_name : user.user_name} lastSenderName={props.user.id === user.user_id ? user.recipient_name : user.user_name} lastMessage="RAHHH I AM SO ANGRY!"/>
                    </CardActionArea>
                )
            }))
        })
    }

    return (
        <Stack direction='column'>     
            {sidebar}
            <InviteUser user={props.user} setFocusedUser={props.setFocusedUser} update={update}></InviteUser>
        </Stack>
    );
}
