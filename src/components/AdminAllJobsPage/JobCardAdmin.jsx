// src/components/Admin/AdminAllJobsPage/JobCardAdmin.jsx

import React from 'react';
import { Box, Typography, Paper, Chip, IconButton } from '@mui/material';
import { FaMapMarkerAlt, FaUserTie, FaEye, FaTrashAlt } from 'react-icons/fa';
import { formatDistanceToNow, parseISO } from 'date-fns';

// Couleurs et Styles d'Accentuation
const PRIMARY_BLUE = '#3f51b5';
const MUTED_GRAY = '#888';
const DANGER_RED = '#f44336';
const PRIMARY_ORANGE = '#ff6b33';


/**
 * Carte d'affichage pour une offre d'emploi dans le tableau de bord de l'Administrateur.
 * Affiche l'offre ainsi que le nom de l'employeur.
 */
const JobCardAdmin = ({ job }) => {

    const timeAgo = (dateString) => {
        if (!dateString) return 'Date not found';
        const date = parseISO(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: '12px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.2s ease-in-out',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': {
                    transform: 'translateY(-3px)',
                }
            }}
        >
            {/* Header (Title and Company Name) */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}>
                        {job.title}
                    </Typography>
                    <Chip 
                        label={job.type} 
                        size="small"
                        sx={{
                            bgcolor: PRIMARY_ORANGE,
                            color: 'white',
                            fontWeight: 600,
                        }}
                    />
                </Box>

                {/* Employer Details */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FaUserTie style={{ marginRight: '8px', fontSize: '14px', color: MUTED_GRAY }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: PRIMARY_BLUE }}>
                        {job.employer?.name || 'N/A'} (ID: {job.employer_id})
                    </Typography>
                </Box>


                {/* Location */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: MUTED_GRAY }}>
                    <FaMapMarkerAlt style={{ marginRight: '8px', fontSize: '14px' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {job.location}
                    </Typography>
                </Box>

                {/* Job Summary */}
                <Typography variant="body2" sx={{ color: '#555', mb: 2, height: 40, overflow: 'hidden' }}>
                    {job.description?.substring(0, 100)}...
                </Typography>
            </Box>

            {/* Footer and Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid #eee' }}>

                {/* Date Posted */}
                <Typography variant="caption" sx={{ color: MUTED_GRAY }}>
                    Posted {timeAgo(job.created_at)}
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" sx={{ color: PRIMARY_BLUE }} title="View Details">
                        <FaEye />
                    </IconButton>
                    <IconButton size="small" sx={{ color: DANGER_RED }} title="Delete Job">
                        <FaTrashAlt />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export default JobCardAdmin;