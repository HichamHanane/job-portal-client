import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { FaSuitcase, FaMapMarkerAlt, FaBuilding, FaClipboardList, FaTimes } from 'react-icons/fa';



function DetailsPopup({ open, handleClose, job }) {

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={true}
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        padding: 3,
                        position: 'relative',
                    },
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <FaTimes />
                </IconButton>

                <DialogTitle sx={{ padding: '16px 0 8px 0' }}>
                    <Box display="flex" alignItems="center" mb={1}>
                        <FaSuitcase style={{ color: '#3f51b5', marginRight: '10px', fontSize: '24px' }} />
                        <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#333' }}>
                            {job?.title}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <Chip
                            icon={<FaBuilding />}
                            label={job?.company_name}
                            size="small"
                            sx={{ bgcolor: '#f0f4ff', color: '#3f51b5', fontWeight: 600 }}
                        />
                        <Chip
                            icon={<FaMapMarkerAlt />}
                            label={job?.location}
                            size="small"
                            sx={{ bgcolor: '#f0f4ff', color: '#3f51b5' }}
                        />
                    </Box>
                </DialogTitle>

                <DialogContent dividers sx={{ padding: '20px 0' }}>

                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                        Job Description
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                        {job?.description}
                    </Typography>



                </DialogContent>

                <DialogActions sx={{ padding: '16px 0 0 0', justifyContent: 'flex-start' }}>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            background: 'linear-gradient(to right, #ff9944, #ff6b33)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            '&:hover': {
                                background: 'linear-gradient(to right, #ff9944, #ff6b33)',
                                opacity: 0.9,
                            }
                        }}
                    >
                        Apply Now
                    </Button>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: '#3f51b5',
                            borderColor: '#3f51b5',
                            border: '2px solid',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: '#3f51b5',
                                color: 'white',
                                border: '2px solid #3f51b5',
                            }
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DetailsPopup
