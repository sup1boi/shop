// ModalNotification.tsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ModalNotificationProps {
    open: boolean;
    message: string;
    onClose: () => void;
}

const ModalNotification: React.FC<ModalNotificationProps> = ({ open, message, onClose }) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-notification-title"
            aria-describedby="modal-notification-description"
        >
            <Box sx={style}>
                <Typography id="modal-notification-title" variant="h6" component="h2">
                    Уведомление
                </Typography>
                <Typography id="modal-notification-description" sx={{ mt: 2 }}>
                    {message}
                </Typography>
                <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
                    ОК
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalNotification;
