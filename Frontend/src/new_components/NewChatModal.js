import { useState } from 'react';
import { Box, Button, Modal } from '@mui/material'
import InviteUser from './InviteUser';

export default function NewChatModal(props) {
    const [open, setOpen] = useState(false);
    return (
        <Box py={2}>
            <Button sx={{ backgroundColor: 'red', ":hover": { backgroundColor: 'orange' } }} variant={'contained'} onClick={() => setOpen(true)}>Start new chat</Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box style={style}>
                    <Box p={3}>
                        <InviteUser
                            user={props.user}
                            setFocusedUser={props.setFocusedUser}
                            update={props.update}
                        />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#000000',
    boxShadow: 24,
    borderRadius: 10
};
