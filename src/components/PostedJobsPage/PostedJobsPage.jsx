import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Chip, Grid, Paper } from '@mui/material';
import { FaSearch, FaPlus, FaEye, FaEdit, FaUsers } from 'react-icons/fa';
import JobCardEmployer from './JobCardEmployer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, getMyJobs } from '../../features/JobSlice';
import JobDetailsPopup from './JobDetailsPopup';
import AddJobPopup from '../AddJob/AddJobPopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import { toast } from 'sonner';
import EditJobPopup from './EditJobPopup';

const PRIMARY_BLUE = '#3f51b5';
const SECONDARY_ORANGE = '#ff6b33';
const LIGHT_BLUE_BG = '#f0f4ff';

const JobCardSkeleton = () => (
    <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ bgcolor: '#eee', height: 20, width: '60%' }} />
            <Chip label="" sx={{ bgcolor: '#ddd', height: 24, width: 60 }} />
        </Box>
        <Typography sx={{ bgcolor: '#eee', height: 16, width: '80%', mb: 1 }} />
        <Typography sx={{ bgcolor: '#eee', height: 14, width: '90%', mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Typography sx={{ bgcolor: '#eee', height: 16, width: '30%' }} />
            <Typography sx={{ bgcolor: '#eee', height: 16, width: '20%' }} />
        </Box>
    </Paper>
);

function PostedJobsPage() {
    const { list, isLoading, error } = useSelector(state => state.jobs.my_jobs)
    const dispatch = useDispatch()
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState('All Jobs');
    const [searchTerm, setSearchTerm] = useState('');

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);

    const handleOpenAddPopup = () => setIsAddPopupOpen(true);
    const handleCloseAddPopup = () => setIsAddPopupOpen(false);

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    const handleOpenEditPopup = (jobData) => {
        setSelectedJob(jobData);
        setIsEditPopupOpen(true);
    };
    const handleCloseEditPopup = () => {
        setIsEditPopupOpen(false);
        setSelectedJob(null);
        dispatch(getMyJobs());
    };

    const handleOpenDeletePopup = (jobData) => {
        setJobToDelete(jobData);
        setIsDeletePopupOpen(true);
    };

    const handleCloseDeletePopup = () => {
        setIsDeletePopupOpen(false);
        setJobToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        if (!jobToDelete) return;

        try {
            let result = await dispatch(deleteJob(jobToDelete.id));
            console.log('res :', result);

            if (result.meta.requestStatus == "fulfilled") {
                toast.success(`Job ${jobToDelete.title} deleted successfully.`)
                handleCloseDeletePopup();
            }
        } catch (err) {
            console.error("Deletion failed:", err);
            handleCloseDeletePopup();
        }
    };

    const handleOpenDetailsPopup = (jobData) => {
        setSelectedJob(jobData);
        setIsPopupOpen(true);
    };

    const handleCloseDetailsPopup = () => {
        setIsPopupOpen(false);
        setSelectedJob(null);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {

                let result = await dispatch(getMyJobs())

                const isSuccessful = true;

                if (isSuccessful) {
                    const simulatedData = [
                        { id: 1, title: 'Senior UI/UX Designer', location: 'San Francisco, CA', summary: 'We are looking for a creative Senior UI/UX Designer to join our team...', applicants_count: 32, status: 'ACTIVE', created_at: '2025-09-01' },
                        { id: 2, title: 'Lead Backend Engineer', location: 'New York, NY (Remote)', summary: 'Seeking an experienced Lead Backend Engineer to manage our...', applicants_count: 157, status: 'CLOSED', created_at: '2025-08-15' },
                        { id: 3, title: 'Product Marketing Manager', location: 'Austin, TX', summary: 'Drive the go-to-market strategy for our new software solutions. You\'ll be...', applicants_count: 12, status: 'ACTIVE', created_at: '2025-10-10' },
                    ];
                    setJobs(simulatedData);
                    setError(null);
                } else {
                    setError('No jobs founds');
                    setJobs([]);
                }
            } catch (err) {
                console.log("Error get my jobs :: ", err);
            }
        };
        fetchJobs();

    }, []);

    const filteredJobs = list
        .filter(job => filter === 'All Jobs' || job.status === filter.toUpperCase())
        .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (error && !isLoading) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography color="error" variant="h6">{error}</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ p: 0 }}>
                {/* 1. Header de la Page */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#333' }}>
                        Posted Jobs
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<FaPlus />}
                        sx={{
                            background: `linear-gradient(to right, ${PRIMARY_BLUE}, ${PRIMARY_BLUE})`, // J'utilise le bleu pour "Post a New Job" comme dans l'image
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: '0 4px 10px rgba(63, 81, 181, 0.3)',
                            '&:hover': {
                                background: PRIMARY_BLUE,
                                boxShadow: '0 6px 12px rgba(63, 81, 181, 0.4)',
                            }
                        }}
                        onClick={handleOpenAddPopup}
                    >
                        Post a New Job
                    </Button>
                </Box>


                {/* 2. Filtres et Recherche */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>

                    {/* Champ de Recherche */}
                    {/* <TextField
                    variant="outlined"
                    placeholder="Search jobs by title or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: <FaSearch style={{ marginRight: '10px', color: '#888' }} />,
                        sx: { borderRadius: '10px', flexGrow: 1, backgroundColor: 'white' }
                    }}
                    sx={{ flexGrow: 1 }}
                    size="small"
                /> */}

                    {/* Boutons de Filtre (Chips) */}
                    {/* <Box sx={{ display: 'flex', gap: 1 }}>
                    {['All Jobs', 'Active', 'Closed'].map((status) => (
                        <Chip
                            key={status}
                            label={status}
                            clickable
                            onClick={() => setFilter(status)}
                            sx={{
                                fontWeight: 600,
                                borderRadius: '8px',
                                textTransform: 'none',
                                // Style Actif (comme dans l'image)
                                bgcolor: filter === status ? PRIMARY_BLUE : 'white',
                                color: filter === status ? 'white' : '#555',
                                border: filter === status ? `1px solid ${PRIMARY_BLUE}` : '1px solid #ddd',
                                '&:hover': {
                                    bgcolor: filter === status ? PRIMARY_BLUE : '#f0f4ff',
                                    color: filter === status ? 'white' : PRIMARY_BLUE,
                                }
                            }}
                        />
                    ))}
                </Box> */}
                </Box>

                {/* 3. Liste des Offres d'Emploi */}
                <Grid container spacing={3}>
                    {isLoading ? (
                        // Afficher 3 squelettes de chargement
                        [1, 2, 3].map(i => (
                            <Grid item xs={12} sm={6} lg={4} key={i}>
                                <JobCardSkeleton />
                            </Grid>
                        ))
                    ) : (
                        filteredJobs.map(job => (
                            <Grid item xs={12} sm={6} lg={4} key={job.id}>
                                <JobCardEmployer job={job} onOpenDetails={handleOpenDetailsPopup} onDeleteClick={handleOpenDeletePopup} onEditClick={handleOpenEditPopup}/>
                            </Grid>
                        ))
                    )}
                </Grid>

                {!isLoading && filteredJobs.length === 0 && (
                    <Typography variant="body1" sx={{ color: '#888', mt: 4, textAlign: 'center' }}>
                        No posted jobs match your criteria.
                    </Typography>
                )}

            </Box>
            <AddJobPopup
                open={isAddPopupOpen}
                onClose={handleCloseAddPopup}
            />

            <DeleteConfirmationPopup
                open={isDeletePopupOpen}
                onClose={handleCloseDeletePopup}
                onConfirm={handleDeleteConfirm}
                title={jobToDelete?.title}
            />
            {selectedJob && (
                <EditJobPopup
                    open={isEditPopupOpen}
                    onClose={handleCloseEditPopup}
                    job={selectedJob}
                />
            )}

            {
                selectedJob && (
                    <JobDetailsPopup
                        open={isPopupOpen}
                        onClose={handleCloseDetailsPopup}
                        job={selectedJob}
                    />
                )
            }

        </>
    );
}

export default PostedJobsPage;