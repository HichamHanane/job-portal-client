import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Button
} from '@mui/material';
import {
    FaSuitcase,
    FaBuilding,
    FaMapMarkerAlt,
    FaClock,
    FaCheckCircle,
    FaTimesCircle
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteApplication } from '../../features/ApplicationsSlice';
import { toast } from 'sonner';

const PRIMARY_BLUE = '#3f51b5';
const MUTED_GRAY = '#888';

const STATUS_INFO = {
    'pending': { label: 'PENDING', icon: FaClock, color: '#ff9800', bgcolor: '#fff3e0' }, // Orange
    'reviewed': { label: 'REVIEWED', icon: FaClock, color: '#2196f3', bgcolor: '#e3f2fd' }, // Bleu
    'accepted': { label: 'ACCEPTED', icon: FaCheckCircle, color: '#4caf50', bgcolor: '#e8f5e9' }, // Vert
    'rejected': { label: 'REJECTED', icon: FaTimesCircle, color: '#f44336', bgcolor: '#ffebee' }, // Rouge
};


function UserApplicationCard({ application }) {
    const dispatch = useDispatch()

    const job = application.job || {};
    const status = application.status.toLowerCase();
    const statusDetails = STATUS_INFO[status] || STATUS_INFO['pending'];


    const handleDelete = async (application) => {
        console.log("target application :", application);
        try {
            let result = await dispatch(deleteApplication(application.id))

            if (result.meta.requestStatus == "fulfilled") {
                toast.success('Application deleted Successfully');
            }
        } catch (error) {
            console.log('deleting application Error :', error);
        }
    }

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: '12px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between'
            }}
        >
            <Box>
                {/* Job Title */}
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', mb: 0.5 }}>
                    {job.title || "Job Title N/A"}
                </Typography>

                {/* Company and Location */}
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: MUTED_GRAY, mb: 0.5 }}>
                        <FaBuilding style={{ marginRight: '8px', fontSize: '14px' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {job.company_name || "Company Name N/A"}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: MUTED_GRAY }}>
                        <FaMapMarkerAlt style={{ marginRight: '8px', fontSize: '14px' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {job.location || "Location N/A"}
                        </Typography>
                    </Box>
                </Box>

                {/* Excerpt/Summary du Job Appliqué (pour donner du contexte) */}
                <Typography
                    variant="body2"
                    sx={{ color: '#555', mb: 2, height: 40, overflow: 'hidden' }}
                >
                    {job.summary || job.description || "No job summary available..."}
                </Typography>
            </Box>

            {/* Footer and Status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid #eee' }}>

                {/* Statut de l'Application */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <statusDetails.icon style={{ color: statusDetails.color, marginRight: '8px', fontSize: '16px' }} />
                    <Chip
                        label={statusDetails.label}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            borderRadius: '6px',
                            bgcolor: statusDetails.bgcolor,
                            color: statusDetails.color,
                            textTransform: 'uppercase',
                        }}
                    />
                </Box>

                <Button
                    variant="text"
                    size="small"
                    sx={{ color: '#f44336', textTransform: 'none', fontWeight: 600 }}
                    onClick={() => handleDelete(application)}
                >
                    Delete
                </Button>
            </Box>
        </Paper>
    );
}

export default UserApplicationCard;