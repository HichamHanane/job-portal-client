// src/pages/Login.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn } from '../../features/AuthSlice';

// --- 1. Validation Schema using Yup ---
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login = () => {
    const { isLoading, error } = useSelector(state => state.auth.user_login)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            let result = await dispatch(SignIn(data))
            if (result.meta.requestStatus == "fulfilled") {
                navigate('/')
                toast.success('You Successfully Logged in ');
                return
            }
        } catch (error) {
            console.error('Login failed:', err.response?.data?.message || err.message);
        }

    };

    return (
        // Main Centering Container
        <div className="login-container">
            {/* Login Card/Box */}
            <div className="login-card">
                <h2 className="login-title">Sign In</h2>
                <p className="login-subtitle">to continue to your Job Finder account</p>

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register('email')}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && (
                            <p className="error-message">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && (
                            <p className="error-message">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-login-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging In...' : 'Login'}
                    </button>
                    {error ? <p className="error-message">{error}</p> : null}
                </form>

                <p className="login-footer">
                    Don't have an account?
                    <Link to="/register" className="footer-link">Register Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;