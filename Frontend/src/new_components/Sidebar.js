import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Drawer,
  Divider,
  Stack,
  Box,
  Button,
  CardActionArea,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Nameplate from "./Nameplate";
import InviteUser from "./InviteUser";

export default function Sidebar(props) {
  const [sidebar, setSidebar] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    update();
  }, []);

  async function update() {
    await axios
      .get(
        "https://angrychat-backend-98dcd3d26a9e.herokuapp.com/conversationByUser?user_id=" +
          props.user.id
      )
      .then(async (results) => {
        var conversations = results.data;
        setSidebar(
          conversations.map((user) => (
            <CardActionArea
              key={user.id}
              onClick={() => props.setFocusedUser(user)}
            >
              <Divider />
              <Nameplate
                name={
                  props.user.id === user.user_id
                    ? user.recipient_name
                    : user.user_name
                }
                lastSenderName={
                  props.user.id === user.user_id
                    ? user.recipient_name
                    : user.user_name
                }
                lastMessage="RAHHH I AM SO ANGRY!"
              />
            </CardActionArea>
          ))
        );
      });
  }

  return (
    <>
      {!isMobile && (
        <Stack direction="column" sx={{ width: "75%"}}>
          {sidebar}
          <InviteUser
            user={props.user}
            setFocusedUser={props.setFocusedUser}
            update={update}
          />
        </Stack>
      )}
      {isMobile && (
        <>
          <Button onClick={toggleDrawer}>
            {isDrawerOpen ? "Close Sidebar" : "Open Sidebar"}
          </Button>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            
          >
            <Button onClick={toggleDrawer} style={{padding:"15%"}}>Close Sidebar</Button>
            <Stack direction="column" sx={{ width: "75%" ,paddingBottom:"10%" }}>
              {sidebar}
              <InviteUser
                user={props.user}
                setFocusedUser={props.setFocusedUser}
                update={update}
              />
            </Stack>
          </Drawer>
        </>
      )}
    </>
  );
}
