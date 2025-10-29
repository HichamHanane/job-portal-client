import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Typography,
    Box,
    Button,
} from '@mui/material';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';

// --- Couleurs d'Accentuation ---
const PRIMARY_BLUE = '#3f51b5';
const DANGER_RED = '#f44336'; // Rouge pour l'action de suppression
const DANGER_SHADOW = '0 4px 10px rgba(244, 67, 54, 0.4)';
const SECONDARY_BLUE_HOVER = '#e0e7ff'; // Comme le hover du bouton Login


function DeleteConfirmationPopup({ open, onClose, onConfirm, title }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs" // Petite taille, adaptée à un popup de confirmation
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    textAlign: 'center',
                    p: 2, // Padding interne
                }
            }}
        >
            <DialogContent sx={{ p: 3, pt: 4 }}>
                {/* Icône de danger stylisée */}
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        bgcolor: '#ffcdd2', // Rouge très clair pour le fond
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto 20px',
                    }}
                >
                    <FaTrashAlt style={{ color: DANGER_RED, fontSize: '28px' }} />
                </Box>

                {/* Titre de la confirmation */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                    Confirm Deletion
                </Typography>

                {/* Message de confirmation */}
                <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
                    Are you sure you want to delete the job posting:
                    <br />
                    <Box component="span" sx={{ fontWeight: 600, color: PRIMARY_BLUE }}>
                        "{title || "Selected Job"}"
                    </Box>
                    ? This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
                {/* Bouton Annuler (Style Secondaire) */}
                <Button
                    onClick={onClose}
                    variant="outlined"
                    startIcon={<FaTimes />}
                    sx={{
                        color: PRIMARY_BLUE,
                        borderColor: PRIMARY_BLUE,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: SECONDARY_BLUE_HOVER,
                            borderColor: PRIMARY_BLUE,
                        }
                    }}
                >
                    Cancel
                </Button>

                {/* Bouton Confirmer (Style Principal/Danger) */}
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    startIcon={<FaTrashAlt />}
                    sx={{
                        backgroundColor: DANGER_RED,
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: DANGER_SHADOW,
                        '&:hover': {
                            backgroundColor: '#d32f2f', // Rouge légèrement plus foncé au hover
                            boxShadow: '0 6px 12px rgba(244, 67, 54, 0.6)',
                        }
                    }}
                >
                    Yes, Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmationPopup;