import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress
} from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';

const MUTED_RED = '#f44336'; 


const DeleteUserConfirmationModal = ({
    open,
    handleClose,
    handleConfirmDelete,
    targetUser,
    isLoading
}) => {

    const userName = targetUser?.name || 'this user';
    const userId = targetUser?.id;

    const onConfirm = () => {
        if (userId) {
            handleConfirmDelete(userId); 
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ color: MUTED_RED, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <FaTrashAlt style={{ marginRight: '10px' }} />
                Confirm Deletion
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to permanently delete the user 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ minWidth: 100 }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserConfirmationModal;