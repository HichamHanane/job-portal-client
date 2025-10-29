import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';

// Couleurs basées sur le design de l'application
const PRIMARY_BLUE = '#3f51b5';
const SECONDARY_ORANGE = '#ff6b33';

function ProfileSettingsPage() {
    const { user, role } = useSelector(state => state.auth);

    // const user = user || {
    //     name: 'Alex Johnson',
    //     email: 'alex.johnson@example.com',
    //     role: 'Employer', // Peut être 'Job Seeker' ou 'Employer'
    //     avatarUrl: null, // Placeholder pour l'avatar
    // };

    return (
        <Box sx={{ p: 0 }}>
            {/* Titre de la section (comme dans l'image du dashboard) */}
            <Typography variant="h4" component="h1" sx={{
                fontWeight: 700,
                color: '#333',
                mb: 1
            }}>
                Profile Settings
            </Typography>
            

            {/* Conteneur principal (Paper) pour les informations de profil */}
            <Paper
                sx={{
                    p: 4,
                    borderRadius: '12px', // Coins arrondis cohérents
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', // Ombre douce
                    maxWidth: 700, // Limiter la largeur pour une meilleure lisibilité
                }}
            >
                {/* En-tête du profil avec Avatar et Nom */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                        alt={user?.name}
                        src={user?.avatarUrl}
                        sx={{
                            bgcolor: PRIMARY_BLUE,
                            width: 80,
                            height: 80,
                            mr: 3,
                            fontSize: '36px',
                            border: `3px solid ${PRIMARY_BLUE}` // Accent bleu
                        }}
                    >
                        {user?.name ? user?.name[0].toUpperCase() : <FaUserCircle />}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>
                            {user?.name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#888', mt: 0.5 }}>
                            User Profile
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Liste des détails (Email, Rôle) */}
                <List sx={{ p: 0 }}>
                    {/* Détail: Email */}
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 40, color: PRIMARY_BLUE }}>
                            <FaEnvelope />
                        </ListItemIcon>
                        <ListItemText
                            primary="Email Address"
                            secondary={user?.email}
                            primaryTypographyProps={{ fontWeight: 600, color: '#333' }}
                            secondaryTypographyProps={{ color: '#555' }}
                        />
                    </ListItem>

                    <Divider variant="inset" component="li" sx={{ ml: 5 }} />

                    {/* Détail: Rôle */}
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 40, color: SECONDARY_ORANGE }}>
                            <FaBriefcase />
                        </ListItemIcon>
                        <ListItemText
                            primary="Account Role"
                            secondary={role}
                            primaryTypographyProps={{ fontWeight: 600, color: '#333' }}
                            secondaryTypographyProps={{ color: SECONDARY_ORANGE, fontWeight: 700 }}
                        />
                    </ListItem>
                </List>



            </Paper>
        </Box>
    );
}

export default ProfileSettingsPage;