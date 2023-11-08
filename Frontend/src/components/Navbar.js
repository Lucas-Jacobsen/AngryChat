import React from "react";
import "../App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Typography, Button, Toolbar } from "@mui/material";
import { SignOutButton } from "@clerk/clerk-react";

export default function Navbar() {

    return (
        <nav>
            <Toolbar>
            <Typography variant="h2" px={2}>AngryChat</Typography>
            <SignOutButton />
            </Toolbar>
        </nav>
    );
}