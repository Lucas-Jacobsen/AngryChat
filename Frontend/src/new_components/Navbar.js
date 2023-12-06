import { Typography, Box, Stack, Toolbar } from "@mui/material";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Navbar() {

    return (
        <Toolbar>
            <Stack direction="row" alignItems={'center'}>
                <Box width={'50vw'} >
                    <Typography fontWeight={700} color='#ff2c00' variant="h3" py={1} paddingRight={2}>AngryChat</Typography>
                </Box>
                <Box width={'50vw'} display='flex' justifyContent='flex-end' pr={6}>
                    <UserButton/>
                </Box>
            </Stack>
        </Toolbar>
    );
}