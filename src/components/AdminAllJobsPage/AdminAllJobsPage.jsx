import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box, Typography, CircularProgress, Alert, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Button, IconButton, Chip
} from '@mui/material';
import { FaBriefcase, FaPlus, FaTrashAlt, FaEye, FaEdit } from 'react-icons/fa';
import DeleteConfirmationPopup from '../PostedJobsPage/DeleteConfirmationPopup';
import AddJobPopup from '../AddJob/AddJobPopup';
import { getAdminAllJobs } from '../../features/AdminSlice';
import { deleteJob } from '../../features/JobSlice';
import { toast } from 'sonner';


const PRIMARY_BLUE = '#3f51b5';
const SECONDARY_ORANGE = '#ff6b33';
const DANGER_RED = '#f44336';


const AdminAllJobsPage = () => {
    const dispatch = useDispatch();
    const { list, isLoading, error, test } = useSelector(state => state.admin.admin_all_jobs);


    const [targetJob, setTargetJob] = useState(null);

    useEffect(() => {
        dispatch(getAdminAllJobs());
    }, [dispatch]);






    const handleDelete =async (job) => {
        try {
            let result = await dispatch(deleteJob(job.id));
            console.log('res :', result);

            if (result.meta.requestStatus == "fulfilled") {
                toast.success(`Job ${job.title} deleted successfully.`)
                dispatch(getAdminAllJobs());
                return;
            }
        } catch (err) {
            console.error("Deletion failed:", err);
        }
    }




    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }
    if (error) {
        return <Alert severity="error" sx={{ my: 3 }}>Error fetching jobs: {error}</Alert>;
    }

    // --- Rendu du Tableau ---
    return (
        <Box sx={{ p: 3 }}>
            {/* 1. Header et Bouton d'Action */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    borderBottom: '2px solid #eee',
                    pb: 1.5
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>
                    <FaBriefcase style={{ marginRight: '15px' }} />
                    All Job Postings {test}
                </Typography>

                {/* <Button
                    variant="contained"
                    onClick={handleOpenAdd} // Ouvre la modal d'ajout
                    startIcon={<FaPlus />}
                    sx={{
                        bgcolor: SECONDARY_ORANGE, // Couleur cohérente avec le style Appliquer/Ajouter
                        '&:hover': { bgcolor: '#e65c26' },
                        borderRadius: '8px',
                        fontWeight: 600
                    }}
                >
                    Add New Job
                </Button> */}
            </Box>

            {/* 2. Tableau des Offres d'Emploi */}
            <Paper elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f0f4ff' }}>
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>Posted By</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE, textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list?.length > 0 ? (
                                list?.map((job) => (
                                    <TableRow key={job.id} sx={{ '&:hover': { backgroundColor: '#f0f4ff30' } }}>
                                        <TableCell sx={{ fontWeight: 600 }}>{job.title}</TableCell>
                                        <TableCell>{job.location}</TableCell>
                                        <TableCell>{job.employer?.name || 'N/A'}</TableCell>
                                        <TableCell>{new Date(job.created_at).toLocaleDateString()}</TableCell>

                                        <TableCell sx={{ textAlign: 'center' }}>


                                            <IconButton size="small" onClick={() => handleDelete(job)} sx={{ color: DANGER_RED }} title="Delete Job">
                                                <FaTrashAlt />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>No job postings found.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </Box>
    );
};

export default AdminAllJobsPage;