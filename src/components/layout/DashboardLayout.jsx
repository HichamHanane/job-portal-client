import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { FaBars } from 'react-icons/fa';
import { fetchUser, logoutUser } from '../../features/AuthSlice';
import { toast } from 'sonner';

function DashboardLayout() {
    const { user, role } = useSelector(state => state.auth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {

        try {
            let result = await dispatch(logoutUser());
            if (result.meta.requestStatus === 'fulfilled') {
                toast.success('Logged out successfully');
                navigate('/login');

            }
        }
        catch (error) {
            console.log("Error while dispatching logout", error);
            toast.error('Logged out Faild , Try again');
        }
    };

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    return (
        <div className="dashboard-container">

            {/* 1. Sidebar (Fixed Left) */}
            <Sidebar
                handleLogout={handleLogout}
                isOpen={isSidebarOpen}
                handleToggle={handleToggleSidebar}
                role={role}
            />

            {/* 2. Main Content Area */}
            <main className="main-content">

                {/* 2.1. Content Header */}
                <header className="content-header">
                    {/* Hamburger Menu (visible on mobile only) */}
                    <FaBars className="hamburger-menu" onClick={handleToggleSidebar} />

                    {/* Logo (for mobile view, hidden on desktop) */}
                    <Link to="/" className="sidebar-logo" style={{ marginRight: 'auto' }}>JF</Link>

                    {/* User Info on the right */}
                    <div className="user-info">
                        <span>{user?.name || 'Guest'}</span>
                        {/* <img
                            src={user?.avatarUrl || 'https://via.placeholder.com/40/3f51b5/ffffff?text=A'}
                            alt={user?.name || 'User'}
                            className="user-avatar"
                        /> */}
                    </div>
                </header>

                {/* 2.2. Page Content (Dynamic) */}
                <div className="page-content-wrapper">
                    {/* The <Outlet /> renders the content of the nested routes (Profile, Jobs, Applications) */}
                    <Outlet />
                </div>

            </main>
        </div>
    );
}

export default DashboardLayout;