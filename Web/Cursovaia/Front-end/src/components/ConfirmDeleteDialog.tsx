// ConfirmDeleteDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ConfirmDeleteDialogProps {
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, title, description, onConfirm, onCancel }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Отмена
                </Button>
                <Button onClick={onConfirm} color="secondary">
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
