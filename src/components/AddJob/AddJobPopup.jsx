// src/components/AddJobPopup.jsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import { FaTimes, FaBriefcase } from 'react-icons/fa';
import JobForm from './JobForm';
import { useDispatch, useSelector } from 'react-redux';
import { addJob } from '../../features/JobSlice';
import { toast } from 'sonner';

// Couleurs d'accentuation
const PRIMARY_BLUE = '#3f51b5';

function AddJobPopup({ open, onClose }) {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.jobs.add_job)

    const handleFormSubmit = async (data) => {
        console.log("Submitting Job Data:", data);

        try {
            const result = await dispatch(addJob(data));

            if (result.meta.requestStatus == "fulfilled") {
                toast.success('Offer Created Successfully')
                onClose();
            }
        } catch (error) {
            console.error("Job creation failed:", error);
            toast.error(error)
        } finally {
            // setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }
            }}
        >
            {/* Bouton de fermeture */}
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <FaTimes />
            </IconButton>

            <DialogTitle sx={{ pt: 3, pb: 1, px: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FaBriefcase style={{ color: PRIMARY_BLUE, fontSize: '24px', marginRight: '15px' }} />
                    <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#333' }}>
                        Post a New Job
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 4 }}>
                <JobForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    );
}

export default AddJobPopup;