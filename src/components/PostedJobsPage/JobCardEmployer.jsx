import React from 'react';
import { Box, Typography, Paper, Chip, IconButton } from '@mui/material';
import { FaMapMarkerAlt, FaUsers, FaEdit, FaEye, FaTrash, FaTrashAlt } from 'react-icons/fa';

const PRIMARY_BLUE = '#3f51b5';
const LIGHT_BLUE_BG = '#f0f4ff';
const ACTIVE_GREEN = '#4caf50';
const CLOSED_RED = '#f44336';
const MUTED_GRAY = '#888';


const JobCardEmployer = ({ job, onOpenDetails, onDeleteClick, onEditClick }) => {
    const isClosed = job.status === 'CLOSED';

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: '12px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-3px)',
                }
            }}
        >
            {/* Header (Title and Status Chip) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}>
                    {job.title}
                </Typography>

            </Box>

            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'center', color: MUTED_GRAY, mb: 1.5 }}>
                <FaMapMarkerAlt style={{ marginRight: '8px', fontSize: '14px' }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {job.location}
                </Typography>
            </Box>

            {/* Job Summary */}
            <Typography variant="body2" sx={{ color: '#555', mb: 2, height: 40, overflow: 'hidden' }}>
                {job.description}...
            </Typography>

            {/* Footer and Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid #eee' }}>

                {/* Applicants Count */}
                <Box sx={{ display: 'flex', alignItems: 'center', color: PRIMARY_BLUE, fontWeight: 600 }}>
                    <FaUsers style={{ marginRight: '8px', fontSize: '16px' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: PRIMARY_BLUE }}>
                        {job.applicants_count} Applicants
                    </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                        size="small"
                        sx={{ color: PRIMARY_BLUE }}
                        title="View Details"
                        onClick={() => onOpenDetails(job)}
                    >
                        <FaEye />
                    </IconButton>
                    <IconButton size="small" sx={{ color: MUTED_GRAY }} title="Edit Job" onClick={() => onEditClick(job)} >
                        <FaEdit />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ color: "red" }}
                        title="Delete Job"
                        onClick={() => onDeleteClick(job)}
                    >
                        <FaTrashAlt />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export default JobCardEmployer;