import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton
} from '@mui/material';
import { FaUserCircle, FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { deleteUser, getUsers } from '../../features/AdminSlice';
import AddUserModal from './AddUserModal';
import DeleteUserConfirmationModal from './DeleteUserConfirmationModal';
import { toast } from 'sonner';

const PRIMARY_BLUE = '#3f51b5';
const SECONDARY_ORANGE = '#ff6b33';
const DANGER_RED = '#f44336';


const UsersPage = () => {
    const dispatch = useDispatch();
    const { list: users, isLoading, error } = useSelector(state => state.admin.users);
    const { isLoading: isAddingUser } = useSelector(state => state.admin.addUser);
    const { delete_user } = useSelector(state => state.admin);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleOpenAddModal = () => setIsAddModalOpen(true);
    const handleCloseAddModal = () => setIsAddModalOpen(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleOpenDeleteModal = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = async (userId) => {

        try {
            let result = await dispatch(deleteUser(userId));

            if (result.meta.requestStatus == "fulfilled") {
                toast.success('The user Deleted Successfully')
                setIsDeleteModalOpen(false);
                return;
            }

        } catch (error) {
            console.error("User creation failed in modal:", err);
        }

    };










    useEffect(() => {
        if (!isAddingUser && isAddModalOpen) {
            handleCloseAddModal();
        }
    }, [isAddingUser]);


    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ my: 3 }}>
                Error fetching users: {error}
            </Alert>
        );
    }

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
                    <FaUserCircle style={{ marginRight: '15px', fontFamily: 'Poppins' }} />
                    User Management
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleOpenAddModal}
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

                >
                    Add New User
                </Button>
            </Box>

            {/* 2. Tableau des Utilisateurs */}
            <Paper elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="user table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f0f4ff' }}> {/* Fond légèrement bleu pour l'entête */}
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: PRIMARY_BLUE, textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                            '&:hover': { backgroundColor: '#f0f4ff' }
                                        }}
                                    >
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>


                                            {/* Bouton de suppression */}
                                            <IconButton
                                                size="small"
                                                onClick={() => handleOpenDeleteModal(user)}
                                                sx={{ color: DANGER_RED, ml: 1 }}
                                                title="Delete User"
                                            >
                                                <FaTrashAlt />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ textAlign: 'center', color: '#888', py: 4 }}>
                                        No users found in the system.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <AddUserModal open={isAddModalOpen} handleClose={handleCloseAddModal} />
            <DeleteUserConfirmationModal
                open={isDeleteModalOpen}
                handleClose={handleCloseDeleteModal}
                handleConfirmDelete={handleConfirmDelete}
                targetUser={userToDelete}
                isLoading={delete_user.isLoading}
            />
        </Box>
    );
};

export default UsersPage;