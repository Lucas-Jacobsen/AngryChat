import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Drawer,
  Divider,
  Stack,
  List,
  CardActionArea,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import Nameplate from "./Nameplate";
import InviteUser from "./InviteUser";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons"
import NewChatModal from "./NewChatModal";

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
            <div key={user.id}>
              <CardActionArea onClick={() => props.setFocusedUser(user)}>
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
            </div>
          ))
        );
      });
  }

  return (
    <>
      {!isMobile && (
        <Stack direction="column" sx={{ width: "100%", boxShadow: "20px 0px 10px rgba(255, 0, 0, 0)" }}>
          <List style={{ maxHeight: "80vh", overflowY: "auto" }}>
            {sidebar}
          </List>
          <Box style={{ justifyContent: 'center', display: 'flex' }}>
            <NewChatModal user={props.user} setFocusedUser={props.setFocusedUser} update={update} />
          </Box>
        </Stack>
      )}
      {isMobile && (
        <>
          <IconButton onClick={toggleDrawer}>
            <MenuOutlined />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
          >
            <IconButton sx={{ width: 30, paddingLeft: 3, paddingTop: 2 }} onClick={toggleDrawer}>
              <CloseOutlined />
            </IconButton>
            <Stack direction="column" sx={{ width: "100%", paddingBottom: "10%" }}>
              <List style={{ maxHeight: "100%", overflowY: "auto" }}>
                {sidebar}
              </List>
              <NewChatModal user={props.user} setFocusedUser={props.setFocusedUser} update={update} />
            </Stack>
          </Drawer>
        </>
      )}
    </>
  );
}
