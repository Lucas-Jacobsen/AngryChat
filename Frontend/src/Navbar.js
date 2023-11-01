import React from "react";
import "./App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Typography } from "@mui/material";

export default function Navbar() {

    return (
        <nav>
            <Typography variant="h2" px={2}>AngryChat</Typography>
        </nav>
    );
}