import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Select, MenuItem, FormControl,
    InputLabel, Box, Typography, CircularProgress
} from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addUser } from '../../features/AdminSlice';

const validationSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .max(255, 'Name must be at most 255 characters'),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .max(255, 'Email must be at most 255 characters'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    role: yup.string()
        .required('Role is required')
        .oneOf(['user', 'employer', 'admin'], 'Invalid role selected'),
});

const defaultValues = {
    name: '',
    email: '',
    password: '',
    role: 'user',
};


const AddUserModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.admin.addUser);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema), 
    });

const onSubmit = (data) => {
    console.log('Form data valid, dispatching:', data);

    dispatch(addUser(data)).unwrap()
        .then(() => {
            reset(defaultValues);
        })
        .catch((err) => {
            console.error("User creation failed in modal:", err);
        });
};

useEffect(() => {
    if (open) {
        reset(defaultValues);
    }
}, [open, reset]);

return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
            Add New User
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>

                    {/* Champ Name */}
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                                required
                            />
                        )}
                    />

                    {/* Champ Email */}
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                type="email"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                                required
                            />
                        )}
                    />

                    {/* Champ Password */}
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                                required
                            />
                        )}
                    />

                    {/* Champ Role (Select) */}
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth required error={!!errors.role}>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    {...field}
                                    label="Role"
                                >
                                    <MenuItem value={'user'}>User</MenuItem>
                                    <MenuItem value={'employer'}>Employer</MenuItem>
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                </Select>
                                {errors.role && (
                                    <Typography color="error" variant="caption" sx={{ ml: 1.5, mt: 0.5 }}>
                                        {errors.role.message}
                                    </Typography>
                                )}
                            </FormControl>
                        )}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="error" disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    type="submit" 
                    color="primary"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ minWidth: 100 }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create User'}
                </Button>
            </DialogActions>
        </Box>
    </Dialog>
);
};

export default AddUserModal;