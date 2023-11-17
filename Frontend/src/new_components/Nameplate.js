import { Typography, Stack, Avatar } from "@mui/material";

export default function Nameplate(props) {

    return (
        <Stack px={2} py={1} direction='row' style={{width: '100%'}}>
            <Avatar/>
            <Stack direction='column'>
                <Typography variant="h6" px={2}>{props.name}</Typography>
                {/* <Typography variant="subtitle1" px={2}>{props.lastMessage}</Typography> */}
            </Stack>
        </Stack>
    );
}