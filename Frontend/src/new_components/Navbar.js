import { Typography, Grid, Toolbar } from "@mui/material";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Navbar() {

    const { user } = useUser();

    return (
        <Toolbar>
            <Grid container alignItems={'center'}>
                <Grid item md={6} >
                    <Typography fontWeight={700} color='#ff2c00' variant="h3" py={1} paddingRight={2}>AngryChat</Typography>
                </Grid>
                <Grid item md={6} container justifyContent={'flex-end'}>
                    <UserButton/>
                </Grid>
            </Grid>
        </Toolbar>
    );
}