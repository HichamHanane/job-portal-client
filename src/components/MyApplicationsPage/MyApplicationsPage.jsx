// src/pages/MyApplicationsPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserApplications } from '../../features/ApplicationsSlice';
import UserApplicationCard from './UserApplicationCard';

// --- Couleurs d'Accentuation ---
const PRIMARY_BLUE = '#3f51b5';
const MUTED_GRAY = '#888';

function MyApplicationsPage() {
    const { list, isLoading, error } = useSelector(state => state.applications.user_application);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserApplications());
    }, [dispatch]);

    const ApplicationCardSkeleton = () => (
        <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', height: 200 }}>
            <Typography variant="h6" sx={{ bgcolor: '#eee', height: 20, width: '70%', mb: 1 }} />
            <Box sx={{ bgcolor: '#ddd', height: 16, width: '50%', mb: 2 }} />
            <Box sx={{ bgcolor: '#eee', height: 14, width: '90%', mb: 1 }} />
            <Box sx={{ bgcolor: '#eee', height: 14, width: '85%', mb: 4 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ bgcolor: '#ddd', height: 24, width: 80, borderRadius: '6px' }} />
                <Box sx={{ bgcolor: PRIMARY_BLUE, height: 24, width: 60, borderRadius: '8px' }} />
            </Box>
        </Paper>
    );

    if (isLoading) {
        return (
            <Grid container spacing={3}>
                {[1, 2, 3].map(i => (
                    <Grid item xs={12} sm={6} lg={4} key={i}>
                        <ApplicationCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        )
    }
    return (
        <Box sx={{ p: 4 }}>
            {/* Header de la Page */}
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: PRIMARY_BLUE, mb: 1 }}>
                My Applications
            </Typography>
            <Typography variant="h6" sx={{ color: MUTED_GRAY, mb: 4 }}>
                Track the status of your submitted job applications.
            </Typography>



            {error && !isLoading && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    Error loading your applications: {error.message || "Could not retrieve data."}
                </Alert>
            )}

            {/* Liste des Candidatures */}
            {!isLoading && list && list?.length === 0 ? (
                <Alert severity="info" sx={{ mt: 3 }}>
                    You have not submitted any job applications yet.
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {list && list?.map((application) => (
                        <Grid item xs={12} sm={6} lg={4} key={application.id}>
                            <UserApplicationCard
                                application={application}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default MyApplicationsPage;