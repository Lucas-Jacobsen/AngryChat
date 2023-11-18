import axios from "axios";
import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";

export default function InviteUser(props) {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [names, setNames] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("https://angrychat-backend-98dcd3d26a9e.herokuapp.com/getAllUsers").then((result) => {
            let tempUsers = [];
            setUsers(result.data);
            result.data.forEach((element) => {
                tempUsers.push(element.firstName + " " + element.lastName);
            });
            setNames(tempUsers);
        });
    }, []);

    function userChange(event) {
        setUser(users[event.target.dataset.optionIndex]);
        setError(""); // Clear error when user selects an option
    }

    async function startChat() {
        if (!user) {
            setError("Please select a user before starting the chat");
            return;
        }

        console.log(props.user.fullName);

        await axios
            .post(
                "https://angrychat-backend-98dcd3d26a9e.herokuapp.com/conversation?user_id=" +
                    props.user.id +
                    "&recipient_id=" +
                    user.user_id +
                    "&user_name=" +
                    props.user.fullName +
                    "&recipient_name=" +
                    user.firstName +
                    " " +
                    user.lastName
            )
            .then((results) => {
                console.log(results);
                props.setFocusedUser(user);
                props.update();
            });
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '5%', paddingBottom:"5%"}}>
            <hr style={{backgroundColor: 'grey'}}/>
            <h3>Start a new Chat</h3>
            <Box>
                <Autocomplete
                    disablePortal
                    id="combo-box"
                    options={names} 
                    onChange={userChange}
                    renderInput={(params) => <TextField {...params} label="Select a User" />}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button onClick={startChat} style={{fontSize:'1.5rem'}}>Start Chat</Button>
            </Box>
        </div>
    );
}
