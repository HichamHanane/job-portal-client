import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Jobs.css';
import JobCard from '../JobCard/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../features/JobSlice';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DetailsPopup from '../Popups/DetailsPopup';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { applyForJob } from '../../features/ApplicationsSlice';
import ApplyJobPopup from '../ApplyJob/ApplyJobPopup';
import { toast } from 'sonner';

// const fakeJobs = [
//     { id: 1, title: 'Senior UX Designer', company: 'InnovateTech Inc.', location: 'San Francisco, CA', date: '7 days', category: 'Design' },
//     { id: 2, title: 'Frontend Developer (React)', company: 'CodeGenius', location: 'Austin, TX', date: '3 days', category: 'Frontend' },
//     { id: 3, title: 'Product Manager', company: 'FutureVision Products', location: 'Remote', date: '1 day', category: 'Product' },
//     { id: 4, title: 'Data Scientist', company: 'DataDriven Insights', location: 'New York, NY', date: '5 days', category: 'Data' },
//     { id: 5, title: 'Cloud Solutions Architect', company: 'SkyHigh Cloud Services', location: 'Seattle, WA', date: '1 week', category: 'IT' },
//     { id: 6, title: 'Marketing Director', company: 'GrowthLeap Agency', location: 'Chicago, IL', date: '4 days', category: 'Marketing' },
//     { id: 7, title: 'DevOps Engineer', company: 'CloudWorks', location: 'Remote', date: '2 days', category: 'IT' },
//     { id: 8, title: 'Mobile App Developer', company: 'AppGenius', location: 'San Diego, CA', date: '8 days', category: 'Frontend' },
//     { id: 9, title: 'Content Writer', company: 'WriteRight', location: 'Remote', date: '6 days', category: 'Marketing' },
// ];

const Jobs = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const { test, isLoading, error, jobs } = useSelector(state => state.jobs);
    const { apply_job: applyStatus } = useSelector(state => state.applications)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    let [targetJob, setTargetJob] = useState({})

    const handleTargetJob = (job) => {
        setTargetJob(job);
    }
    // const [categoryFilter, setCategoryFilter] = useState('');
    // const [locationFilter, setLocationFilter] = useState('');
    // const [jobTypeFilter, setJobTypeFilter] = useState('');


    // Filtering logic (will be replaced by backend filtering later)
    // const filteredJobs = jobs?.filter(job => {
    //     const matchesSearch = job?.title?.toLowerCase().includes(searchTerm?.toLowerCase());
    //     const matchesCategory = categoryFilter === '' || job?.category?.toLowerCase() === categoryFilter?.toLowerCase();
    //     const matchesLocation = locationFilter === '' || job?.location?.toLowerCase().includes(locationFilter?.toLowerCase());
    //     const matchesJobType = jobTypeFilter === '' || (jobTypeFilter === 'Full-time' && !job?.title?.includes('Part-time')); // Simple example

    //     return matchesSearch && matchesCategory && matchesLocation && matchesJobType;
    // });

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);

    const handleOpenApplyPopup = (jobData) => {
        if (!isAuthenticated) {
            toast.error('You must log in to apply for a job.', {
                position: "top-center",
                duration: 3000,
            });
            return;
        }
        setTargetJob(jobData);
        setIsApplyPopupOpen(true);
    };

    const handleCloseApplyPopup = () => {
        setIsApplyPopupOpen(false);
        setTargetJob(null);
        // Vous pouvez réinitialiser l'état de candidature ici si nécessaire
        // dispatch(resetApplyStatus()); 
    };

    const handleConfirmApply = async () => {
        if (!targetJob) return;

        const resultAction = await dispatch(applyForJob(targetJob.id));


        if (applyForJob.fulfilled.match(resultAction)) {
            toast.success(resultAction.payload.message || 'Application submitted successfully!', {
                position: "top-center",
                duration: 3000,
            });
            handleCloseApplyPopup();
        } else {
            const errorPayload = resultAction.payload;
            let friendlyMessage = 'An unexpected error occurred. Application failed.';

            if (errorPayload === 'DUPLICATE_APPLICATION_ERROR') {
                friendlyMessage = `You have already applied for the position of "${targetJob.title}". You cannot submit a duplicate application.`;
            } else if (typeof errorPayload === 'string') {
                friendlyMessage = errorPayload;
            }

            toast.error(friendlyMessage, {
                position: "top-center",
                duration: 5000,
            });
            handleCloseApplyPopup();

        }
    };

    const renderContent = () => {

        if (isLoading) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '200px'
                    }}
                >
                    <CircularProgress color="primary" />
                </Box>
            )
        }
        if (error) {
            return <p>{error}</p>
        }

        return (
            <section className="job-listings-grid-container">
                <div className="job-cards-grid">
                    {jobs?.length > 0 ? (
                        jobs?.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                handleOpenDetailsPopup={handleClickOpen}
                                open={open}
                                handleClose={handleClose}
                                handleTargetJob={handleTargetJob}
                                handleOpenApplyPopup={handleOpenApplyPopup}
                            />
                        ))
                    ) : (
                        <p className="no-jobs-found">No jobs found matching your criteria.</p>
                    )}
                </div>
            </section>
        )
    }



    useEffect(() => {
        dispatch(getJobs(title));
    }, [])

    return (
        <>
            <div className="jobs-page">
                {/* 1. Welcome Section */}
                <section className="jobs-welcome-section">
                    <h1 className="jobs-welcome-title">Explore Thousands of Opportunities</h1>
                    <p className="jobs-welcome-slogan">Your next career move is just a search away.</p>
                </section>

                {/* 2. Search Bar */}
                <section className="jobs-search-bar-container">
                    <form>
                        <div className="search-input-wrapper">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Job title, keywords..."
                                className="jobs-search-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <button type='submit' className='btn-search' onClick={(e) => {
                                e.preventDefault()
                                dispatch(getJobs(title))
                            }}>search</button>

                        </div>
                    </form>

                </section>

                {/* 3. Filtering Section */}
                <section className="jobs-filters-container">
                    {/* Category Filter */}
                    {/* <div className="filter-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        className="filter-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Design">Design</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Product">Product</option>
                        <option value="Data">Data</option>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div> */}

                    {/* Location Filter */}
                    {/* <div className="filter-group">
                    <label htmlFor="location">Location</label>
                    <select
                        id="location"
                        className="filter-select"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                    >
                        <option value="">All Locations</option>
                        <option value="Remote">Remote</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="Austin">Austin</option>
                        <option value="New York">New York</option>
                        <option value="Seattle">Seattle</option>
                        <option value="Chicago">Chicago</option>
                    </select>
                </div> */}

                    {/* Job Type Filter */}
                    {/* <div className="filter-group">
                    <label htmlFor="jobType">Job Type</label>
                    <select
                        id="jobType"
                        className="filter-select"
                        value={jobTypeFilter}
                        onChange={(e) => setJobTypeFilter(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div> */}

                    {/* Placeholder for selected filter 'pill' like in the design */}
                    {/* {jobTypeFilter === 'Full-time' && (
                    <span className="filter-pill">Full-time <span className="remove-pill" onClick={() => setJobTypeFilter('')}>X</span></span>
                )} */}
                </section>

                {/* 4. Job Listings Grid */}
                {renderContent()}

                {/* <section className="pagination-container">
                <button className="pagination-arrow">&lt;</button>
                <div className="pagination-numbers">
                    <span className="page-number active">1</span>
                    <span className="page-number">2</span>
                    <span className="page-number">3</span>
                    <span className="page-dots">...</span>
                    <span className="page-number">12</span>
                </div>
                <button className="pagination-arrow">&gt;</button>
            </section> */}
            </div >
            <DetailsPopup open={open} handleClose={handleClose} job={targetJob} />
            <ApplyJobPopup
                open={isApplyPopupOpen}
                onClose={handleCloseApplyPopup}
                onConfirmApply={handleConfirmApply}
                job={targetJob}
                isLoading={applyStatus.isLoading}
            />

        </>
    );
};

export default Jobs;