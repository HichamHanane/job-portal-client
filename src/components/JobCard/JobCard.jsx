import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSuitcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { formatDistanceToNow, parseISO } from 'date-fns';
import './JobCard.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DetailsPopup from '../Popups/DetailsPopup';

const JobCard = ({ job, handleOpenDetailsPopup, handleTargetJob, handleOpenApplyPopup }) => {

    // const getIcon = (category) => {
    //     switch (category?.toLowerCase()) {
    //         case 'design': return <FaSuitcase />;
    //         case 'frontend': return <FaSuitcase />;
    //         case 'product': return <FaSuitcase />;
    //         case 'data': return <FaSuitcase />;
    //         default: return <FaSuitcase />;
    //     }
    // };



    const timeAgo = (dateString) => {
        if (!dateString) {
            return 'Date not found';
        }
        const date = parseISO(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    // useEffect(()=>{
    //     console.log('Job card :',job);

    // })

    return (
        <>
            <div className="job-card">
                <div className="job-card-header">
                    <div className="job-icon-placeholder">
                        {/* {getIcon(job?.category)} */}
                        <FaSuitcase />
                    </div>
                    <h3 className="job-title">{job?.title}</h3>
                </div>

                <p className="job-company-location">
                    <span>{job?.company_name}</span> - <span>{job?.location}</span>
                </p>

                <div className="job-meta">
                    <span className="job-posted-date">
                        <FaCalendarAlt className="meta-icon" /> Posted {timeAgo(job?.created_at)} ago
                    </span>
                </div>

                <div className="job-card-actions">
                    <button className="btn-apply"
                        onClick={() => handleOpenApplyPopup(job)}
                    >
                        Apply Now
                    </button>

                    <button className="btn-details" onClick={() => {
                        handleOpenDetailsPopup();
                        console.log('Target job :', job);
                        handleTargetJob(job)
                    }} >View Details</button>
                </div>
            </div>
            {/* <DetailsPopup job={targetJob} handleOpenDetailsPopup={handleOpenDetailsPopup} open={open} handleClose={handleClose} /> */}
        </>
    );
};

export default JobCard;