// src/pages/JobApplicantsPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ApplicationCard from './ApplicationCard';
import { getEmpApplications, updateApplicationStatus } from '../../features/ApplicationsSlice';
import { toast } from 'sonner';

const PRIMARY_BLUE = '#3f51b5';

function JobApplicantsPage() {
    const { list, isLoading, error, test } = useSelector(state => state.applications);
    const dispatch = useDispatch();

    const [selectedApplication, setSelectedApplication] = useState(null);
    useEffect(() => {
        dispatch(getEmpApplications());
    }, [dispatch]);

    const handleStatusChange = async (applicationId, newStatus) => {
        console.log(`Updating application ${applicationId} to status: ${newStatus}`);
        try {
            let result = await dispatch(updateApplicationStatus({ id: applicationId, status: newStatus }));

            if (result.meta.requestStatus == "fulfilled") {
                toast.success('Offer updated Successfully')
            }
        } catch (err) {
            console.error("Failed to update application status:", err);
        }
    };

    // 3. Gestion de l'affichage des détails (laisser pour le prochain composant)
    const handleViewDetails = (application) => {
        // Ici, vous ouvririez un popup ou navigueriez vers une page de détails
        setSelectedApplication(application);
        console.log("Viewing details for application:", application.id);
        // Exemple: setIsDetailsPopupOpen(true);
    };

    return (
        <Box sx={{ p: 4 }}>
            {/* Header de la Page */}
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                Job Applicants
            </Typography>


            {/* Affichage des états de chargement/erreur */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress sx={{ color: PRIMARY_BLUE }} />
                </Box>
            )}

            {error && !isLoading && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    Error loading applications: {error.message || "Could not connect to the API."}
                </Alert>
            )}

            {/* Liste des Candidatures */}
            {!isLoading && list.length === 0 ? (
                <Alert severity="info" sx={{ mt: 3 }}>
                    You currently have no applications for your jobs.
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {list.map((application) => (
                        <Grid item xs={12} sm={6} lg={4} key={application.id}>
                            <ApplicationCard
                                application={application}
                                onStatusChange={handleStatusChange}
                                onViewDetails={handleViewDetails}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Ici, vous intégreriez le popup de détails de la candidature */}
            {/* {selectedApplication && (
                <ApplicationDetailsPopup 
                    open={isDetailsPopupOpen} 
                    onClose={handleCloseDetailsPopup} 
                    application={selectedApplication}
                />
            )} */}

        </Box>
    );
}

export default JobApplicantsPage;