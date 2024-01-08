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
    console.log(props.user);
    getUser();
  }, []);

  async function getUser() {
    console.log(props.user.primaryEmailAddress.emailAddress);
    if (props.user) {
      await axios
        .get(
          "https://angrychat-backend-98dcd3d26a9e.herokuapp.com/users?email_address=" +
            props.user.primaryEmailAddress.emailAddress,
        )
        .then((results) => {
          console.log(results);
          console.log(results.data.length === 0);
          if (results.data.length === 0) {
            axios
              .post(
                "https://angrychat-backend-98dcd3d26a9e.herokuapp.com/users?user_id=" +
                  props.user.id +
                  "&email_address=" +
                  props.user.primaryEmailAddress.emailAddress +
                  "&firstName=" +
                  props.user.firstName +
                  "&lastName=" +
                  props.user.lastName,
              )
              .then((results) => {
                console.log(results);
              });
          }
        });
    }
  }

  return (
    <Box style={{ height: "100vh", overflow: "hidden" }}>
      <Box style={{ height: 75 }}>
        <Navbar />
      </Box>
      <Grid container style={{ height: "calc(100vh - 75)" }}>
        <Grid item xs={1} sm={4} md={3}>
          <Sidebar
            user={props.user}
            userList={userList}
            setFocusedUser={setFocusedUser}
          />
        </Grid>
        <Grid
          item
          xs={11}
          sm={8}
          md={9}
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/iconGrid.svg)`,
          }}
        >
          {focusedUser === undefined ? (
            <Box
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box textAlign="center">
                <Typography variant="h2">No users selected</Typography>
                <Typography variant="subtitle1" color="grey">
                  Maybe you should do something about that. Dumb guy.
                </Typography>
              </Box>
            </Box>
          ) : (
            <Chat user={props.user} focusedUser={focusedUser} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
