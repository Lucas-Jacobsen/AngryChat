import { Typography, Stack, Toolbar } from "@mui/material";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Navbar() {

    const { user } = useUser();

    return (
        <Toolbar>
            <Stack direction='row' spacing={1} style={{alignItems: 'center'}}>
                <UserButton />
                <Typography>{user.fullName}</Typography>
            </Stack>
            {/* <Typography variant="h2" px={2}>AngryChat</Typography> */}
        </Toolbar>
    );
}