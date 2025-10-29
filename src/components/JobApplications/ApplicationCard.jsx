import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Button
} from '@mui/material';
import { FaUserCircle, FaBriefcase, FaEnvelope, FaEllipsisV, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const STATUS_COLORS = {
    pending: { color: '#ff9800', bgcolor: '#fff3e0' },
    reviewed: { color: '#2196f3', bgcolor: '#e3f2fd' },
    accepted: { color: '#4caf50', bgcolor: '#e8f5e9' },
    rejected: { color: '#f44336', bgcolor: '#ffebee' },
};

// Couleurs d'Accentuation
const PRIMARY_BLUE = '#3f51b5';
const MUTED_GRAY = '#888';


function ApplicationCard({ application, onStatusChange, onViewDetails }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateStatus = (newStatus) => {
        onStatusChange(application.id, newStatus);
        handleMenuClose();
    };

    // Style de la puce de statut
    const statusInfo = STATUS_COLORS[application.status] || STATUS_COLORS.pending;


    const applicantName = application.user ? application.user.name : "Applicant Name (ID: " + application.id + ")";
    const jobTitle = application.job ? application.job.title : "Job Title N/A";

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: '12px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header (Applicant Name and Status) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '1px solid #eee', pb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FaUserCircle style={{ fontSize: '24px', color: PRIMARY_BLUE, marginRight: '10px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                        {applicantName}
                    </Typography>
                </Box>

                {/* Statut actuel */}
                <Chip
                    label={application.status.toUpperCase()}
                    size="small"
                    sx={{
                        fontWeight: 600,
                        borderRadius: '6px',
                        bgcolor: statusInfo.bgcolor,
                        color: statusInfo.color,
                        textTransform: 'uppercase',
                    }}
                />
            </Box>

            {/* Job Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', color: PRIMARY_BLUE, mb: 1.5 }}>
                <FaBriefcase style={{ marginRight: '8px', fontSize: '14px' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: PRIMARY_BLUE }}>
                    Applied for: {jobTitle}
                </Typography>
            </Box>

            {/* Cover Letter Excerpt */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: MUTED_GRAY, fontWeight: 500, mb: 0.5 }}>
                    <FaEnvelope style={{ marginRight: '5px', fontSize: '12px' }} /> Cover Letter Excerpt:
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', fontStyle: 'italic', pl: 2, borderLeft: `3px solid ${PRIMARY_BLUE}` }}>
                    {application.cover_letter_excerpt || "No excerpt provided."}
                </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1, gap: 1 }}>

                {/* View Details Button */}
                {/* <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onViewDetails(application)}
                    sx={{
                        color: PRIMARY_BLUE,
                        borderColor: PRIMARY_BLUE,
                        borderRadius: '8px',
                        textTransform: 'none'
                    }}
                >
                    View Details
                </Button> */}

                {/* Status Menu Button */}
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleMenuClick}
                    endIcon={<FaEllipsisV />}
                    sx={{
                        backgroundColor: statusInfo.color,
                        '&:hover': { backgroundColor: statusInfo.color, opacity: 0.9 },
                        borderRadius: '8px',
                        textTransform: 'none'
                    }}
                >
                    Actions
                </Button>

                {/* Status Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={() => handleUpdateStatus('accepted')}>
                        <FaCheckCircle style={{ marginRight: '10px', color: STATUS_COLORS.accepted.color }} /> Accept Application
                    </MenuItem>
                    <MenuItem onClick={() => handleUpdateStatus('rejected')}>
                        <FaTimesCircle style={{ marginRight: '10px', color: STATUS_COLORS.rejected.color }} /> Reject Application
                    </MenuItem>
                </Menu>
            </Box>
        </Paper>
    );
}

export default ApplicationCard;