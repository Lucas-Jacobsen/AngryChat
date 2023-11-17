import axios from "axios";
import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";


export default function InviteUser(props) {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [names, setNames] = useState([]);
    useEffect(() => {
        axios.get("https://angrychat-backend-98dcd3d26a9e.herokuapp.com/getAllUsers").then((result) => {
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
        await axios.post("https://angrychat-backend-98dcd3d26a9e.herokuapp.com/conversation?user_id=" + props.user.id + "&recipient_id="  + user.user_id + "&user_name=" + props.user.fullName +  "&recipient_name=" + user.firstName + " " + user.lastName).then((results) => {
            console.log(results)
            props.setFocusedUser(user);
            props.update()
        })
    }

    return (
        <Box>
            <Autocomplete
                disablePortal
                id="combo-box"
                options={names}
                onChange={userChange}
                renderInput={(params) => <TextField {...params} label="Users" />}
            />
            <Button onClick={startChat}>Start Chat</Button>
        </Box>
    )
}