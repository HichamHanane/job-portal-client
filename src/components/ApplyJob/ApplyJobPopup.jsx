// src/components/Popups/ApplyJobPopup.jsx
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Typography,
    Button,
    Box,
    CircularProgress
} from '@mui/material';
import { FaBriefcase, FaCheckCircle, FaTimes } from 'react-icons/fa';

// Couleurs d'Accentuation des fichiers CSS
const PRIMARY_BLUE = '#3f51b5';
const ORANGE_GRADIENT = 'linear-gradient(to right, #ff9944, #ff6b33)';
const MUTED_GRAY = '#888';

/**
 * Popup de confirmation de candidature.
 */
function ApplyJobPopup({ open, onClose, onConfirmApply, job, isLoading }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    textAlign: 'center',
                }
            }}
        >
            {/* Bouton de Fermeture Élégant */}
            <Button
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: MUTED_GRAY,
                    minWidth: 0,
                    p: 1
                }}
            >
                <FaTimes />
            </Button>

            <DialogContent sx={{ p: 5 }}>
                {/* Icône et Titre */}
                <FaBriefcase style={{ fontSize: '36px', color: PRIMARY_BLUE, marginBottom: '16px' }} />

                <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                    Confirm Your Application
                </Typography>

                <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
                    Are you ready to submit your profile for:
                </Typography>

                {/* Information sur l'Offre */}
                <Box
                    sx={{
                        bgcolor: '#f0f4ff',
                        p: 1.5,
                        borderRadius: '8px',
                        mb: 3,
                        borderLeft: `5px solid ${PRIMARY_BLUE}`,
                        textAlign: 'left'
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: PRIMARY_BLUE }}>
                        {job?.title || "Job Title N/A"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                        at {job?.company_name || "Company N/A"}
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: MUTED_GRAY }}>
                    *This action is final. Make sure your profile and documents are up to date.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    disabled={isLoading}
                    sx={{
                        color: PRIMARY_BLUE,
                        borderColor: PRIMARY_BLUE,
                        borderRadius: '8px',
                        textTransform: 'none',
                        padding: '10px 20px',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirmApply}
                    variant="contained"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <FaCheckCircle />}
                    sx={{
                        // Utilise le gradient orange de JobCard.css
                        background: ORANGE_GRADIENT,
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 4px 10px rgba(255, 107, 51, 0.4)',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 6px 12px rgba(255, 107, 51, 0.6)',
                            opacity: 0.9,
                        }
                    }}
                >
                    {isLoading ? 'Applying...' : 'Yes, Apply Now'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ApplyJobPopup;