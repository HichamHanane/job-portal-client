import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import JobForm from '../AddJob/JobForm';
import { editJob } from '../../features/JobSlice';
import { toast } from 'sonner';

// Couleurs d'accentuation
const PRIMARY_BLUE = '#3f51b5';

function EditJobPopup({ open, onClose, job }) {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.jobs.edit_job)

    if (!job) return null;

    const handleFormSubmit = async (formData) => {

        const updateData = {
            id: job.id,
            ...formData,
        };

        console.log("Submitting Update Data:", { id: job.id, data: updateData });

        try {
            const result = await dispatch(editJob({ id: job.id, data: updateData }));

            if (result.meta.requestStatus == "fulfilled") {
                toast.success('Offer updated Successfully')
                onClose();
            }
        } catch (error) {
            console.error("Job update failed:", error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }
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
                    <FaEdit style={{ color: PRIMARY_BLUE, fontSize: '24px', marginRight: '15px' }} />
                    <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#333' }}>
                        Edit Job Posting
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 4 }}>
                {/* Utilisation du JobForm, en passant les valeurs par défaut
                  React Hook Form utilise les valeurs par défaut pour pré-remplir le formulaire.
                  Nous devons nous assurer que les noms de champs correspondent à ceux du schéma (title, description, location, company).
                */}
                <JobForm
                    onSubmit={handleFormSubmit}
                    isLoading={isLoading}
                    defaultValues={{
                        title: job.title || '',
                        description: job.description || '',
                        location: job.location || '',
                        company: job.company_name || '', // Assurez-vous d'utiliser le nom de prop correct de l'API
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}

export default EditJobPopup;