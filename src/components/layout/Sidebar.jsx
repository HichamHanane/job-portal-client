import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaSignOutAlt,
    FaCog,
    FaFileAlt,
    FaBriefcase,
    FaUsers
} from 'react-icons/fa';





const Sidebar = ({ handleLogout, isOpen, handleToggle, role }) => {

    const location = useLocation();

    const isLinkActive = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-top">
                {/* Logo Section */}
                <Link to="/" className="sidebar-logo">JF</Link>

                <ul className="sidebar-nav-list">

                    <li>
                        <Link
                            to="/dashboard/profile"
                            className={`nav-item-link ${isLinkActive('/dashboard/profile') ? 'active' : ''}`}
                            onClick={handleToggle}
                        >
                            <FaCog className="nav-icon" />
                            Profile Settings
                        </Link>
                    </li>

                    {role === 'admin' && (
                        <>
                            <li>
                                <Link
                                    to="/dashboard/users"
                                    className={`nav-item-link ${isLinkActive('/dashboard/users') ? 'active' : ''}`}
                                    onClick={handleToggle}
                                >
                                    <FaUsers className="nav-icon" />
                                    Users
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/all-jobs"
                                    className={`nav-item-link ${isLinkActive('/dashboard/all-jobs') ? 'active' : ''}`}
                                    onClick={handleToggle}
                                >
                                    <FaBriefcase className="nav-icon" />
                                    Jobs
                                </Link>
                            </li>
                        </>
                    )}


                    {role === 'user' && (
                        <li>
                            <Link
                                to="/dashboard/my-applications-user"
                                className={`nav-item-link ${isLinkActive('/dashboard/my-applications-user') ? 'active' : ''}`}
                                onClick={handleToggle}
                            >
                                <FaFileAlt className="nav-icon" />
                                My Applications
                            </Link>
                        </li>
                    )}

                    {role === 'employer' && (
                        <>
                            <li>
                                <Link
                                    to="/dashboard/jobs"
                                    className={`nav-item-link ${isLinkActive('/dashboard/jobs') ? 'active' : ''}`}
                                    onClick={handleToggle}
                                >
                                    <FaBriefcase className="nav-icon" />
                                    Posted Jobs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/my-applications"
                                    className={`nav-item-link ${isLinkActive('/dashboard/my-applications') ? 'active' : ''}`}
                                    onClick={handleToggle}
                                >
                                    <FaUsers className="nav-icon" />
                                    Job Applicants
                                </Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>

            {/* Logout Button (Bottom) */}
            <div className="sidebar-bottom">
                <button
                    onClick={handleLogout}
                    className="btn-logout"
                >
                    <FaSignOutAlt style={{ marginRight: '10px' }} />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;