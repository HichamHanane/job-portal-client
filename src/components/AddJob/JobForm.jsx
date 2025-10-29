// src/components/JobForm.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import * as yup from 'yup';

// Couleurs d'accentuation
const PRIMARY_BLUE = '#3f51b5';
const SECONDARY_ORANGE_GRADIENT = 'linear-gradient(to right, #ff9944, #ff6b33)';

const JobSchema = yup.object().shape({
    title: yup
        .string()
        .required("Job title is required."),

    description: yup
        .string()
        .required("Description is required.")

        .max(500, "Description must be less than 500 characters."),

    location: yup
        .string()
        .required("Location is required."),

    company: yup
        .string()
        .required("Company name is required."),
});
function JobForm({ onSubmit, isLoading, defaultValues }) {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(JobSchema),
        defaultValues: defaultValues || {
            title: '',
            description: '',
            location: '',
            company: '',
        },
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Champ Titre */}
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Job Title"
                        variant="outlined"
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ''}
                        sx={{ '.MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                )}
            />

            {/* Champ Description */}
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Job Description (Max 500 chars)"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description ? errors.description.message : ''}
                        sx={{ '.MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                )}
            />

            {/* Champ Location */}
            <Controller
                name="location"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Location (e.g., Remote, Paris, France)"
                        variant="outlined"
                        fullWidth
                        error={!!errors.location}
                        helperText={errors.location ? errors.location.message : ''}
                        sx={{ '.MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                )}
            />

            {/* Champ Company */}
            <Controller
                name="company"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.company}
                        helperText={errors.company ? errors.company.message : ''}
                        sx={{ '.MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                )}
            />

            {/* Bouton de Soumission */}
            <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                    mt: 2,
                    p: '12px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    textTransform: 'none',
                    // Utilise le style de bouton principal (Orange Gradient) comme dans Header.css
                    background: SECONDARY_ORANGE_GRADIENT,
                    boxShadow: '0 4px 10px rgba(255, 107, 51, 0.4)',
                    '&:hover': {
                        boxShadow: '0 6px 12px rgba(255, 107, 51, 0.6)',
                        opacity: 0.9,
                    },
                    '&:disabled': {
                        backgroundColor: PRIMARY_BLUE, // Reste visible mais désactivé
                        color: 'white',
                        opacity: 0.6,
                    }
                }}
            >
                {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Post Job'}
            </Button>
        </Box>
    );
}

export default JobForm;