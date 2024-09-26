import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, title, description, onConfirm, onCancel }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
