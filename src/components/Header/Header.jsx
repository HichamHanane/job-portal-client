
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from '../../features/AuthSlice';
import { toast } from 'sonner';

function Header() {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/dashboard/profile');
        handleClose();
    };

    const handleLogout = async () => {
        try {
            let result = await dispatch(logoutUser());
            if (result.meta.requestStatus === 'fulfilled') {
                toast.success('Logged out successfully');
                navigate('/login');
                handleClose();
            }
        }
        catch (error) {
            console.log("Error while dispatching logout", error);
            toast.error('Logged out Faild , Try again');
        }
    };
    return (
        // 1. Navbar Container
        <header className="header-container">

            {/* 2. Logo Section */}
            <Link to="/" className="header-logo">
                <span className="logo-jf">JF</span>
            </Link>

            {/* 3. Navigation Buttons */}

            {
                isAuthenticated ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>


                        <IconButton
                            onClick={handleMenu}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            sx={{ p: 0 }}
                        >
                            <Avatar
                                alt={user.name}
                                sx={{ bgcolor: '#3f51b5', width: 40, height: 40, fontWeight: 500 }}
                            >
                                {user.name ? user.name[0].toUpperCase() : <FaUserCircle />}
                            </Avatar>
                        </IconButton>

                        {/* Menu Déroulant MUI */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={open}
                            onClose={handleClose}
                            // Style pour correspondre aux coins arrondis de l'application
                            PaperProps={{
                                sx: {
                                    borderRadius: '12px',
                                    mt: 1,
                                    minWidth: 180,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            {/* Option Profil */}
                            <MenuItem
                                onClick={handleProfileClick}
                                sx={{ fontWeight: 500 }}
                            >
                                <FaUserCircle style={{ marginRight: '10px', color: '#555' }} />
                                Profile
                            </MenuItem>

                            {/* Option Déconnexion */}
                            <MenuItem
                                onClick={handleLogout}
                                sx={{
                                    fontWeight: 500,
                                    color: '#ff6b33', // Utilise l'accent orange pour la déconnexion
                                    borderTop: '1px solid #eee',
                                    mt: 0.5,
                                    pt: 1.5
                                }}
                            >
                                <FaSignOutAlt style={{ marginRight: '10px' }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                )
                    : (
                        <div className="header-actions">
                            {/* Login Button */}
                            <Link to="/login" className="btn btn-login">
                                Login
                            </Link>

                            {/* Register Button */}
                            <Link to="/register" className="btn btn-register">
                                Register
                            </Link>
                        </div>
                    )
            }

        </header>
    );
};

export default Header;