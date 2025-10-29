import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Typography,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    FaSuitcase,
    FaBuilding,
    FaMapMarkerAlt,
    FaCheckSquare,
    FaTimes
} from 'react-icons/fa';

const PRIMARY_BLUE = '#3f51b5';
const SECONDARY_ORANGE_GRADIENT = 'linear-gradient(to right, #ff9944, #ff6b33)';


function JobDetailsPopup({ open, onClose, job }) {
    if (!job) return null;

    const mockRequirements = [
        "5+ years of professional experience with React.js.",
        "Strong understanding of modern UI/UX principles.",
        "Proficient in JavaScript, HTML5, and CSS3/SASS.",
        "Experience with state management libraries like Redux or MobX.",
        "Familiarity with RESTful APIs and modern authorization mechanisms.",
    ];

    const jobDescription = job.summary || job.description || "Description détaillée de l'offre d'emploi non disponible.";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                
                sx: {
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }
            }}
        >
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <FaSuitcase style={{ color: PRIMARY_BLUE, fontSize: '24px', marginRight: '15px' }} />
                    <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#333' }}>
                        {job.title || "Job Title"}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, color: '#555', fontSize: '14px', ml: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FaBuilding style={{ marginRight: '5px' }} />
                        <Typography variant="body2">{job.company_name || "Innovatech Solutions"}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                        <Typography variant="body2">{job.location || "San Francisco, CA"}</Typography>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Job Description
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
                    {jobDescription}
                </Typography>

                

               
            </DialogContent>

            <DialogActions sx={{ p: 3, justifyContent: 'flex-start' }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: PRIMARY_BLUE,
                        borderColor: PRIMARY_BLUE,
                        padding: '10px 25px',
                        borderRadius: '10px',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#f0f4ff', 
                            borderColor: PRIMARY_BLUE,
                        }
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default JobDetailsPopup;