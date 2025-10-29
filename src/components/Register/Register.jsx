
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Register.css';
import { useDispatch, useSelector } from 'react-redux';
import { SignUp } from '../../features/AuthSlice';
import { toast } from 'sonner';

const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    role: yup
        .string()
        .oneOf(['user', 'employer'], 'You must select a role')
        .required('Role is required'),
});

const Register = () => {
    const { isLoading, error } = useSelector(state => state.auth.user_register)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            role: 'user',
        },
    });

    const onSubmit = async (data) => {

        console.log('Registering User:', data);

        try {
            let result = await dispatch(SignUp(data));

            console.log('Register Result :', result);

            if (result.meta.requestStatus == "fulfilled") {
                navigate('/login')
                toast.success('You Successfully Signed up');
                return
            }

        } catch (err) {
            console.error('Registration failed:', err.response?.data?.message || err.message);

        }
    };

    return (
        // Main Centering Container
        <div className="register-container">
            {/* Registration Card/Box */}
            <div className="register-card">
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">Join the Job Finder community today</p>

                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>

                    {/* Name Field */}
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input id="name" type="text" placeholder="Your Name" {...register('name')} className={errors.name ? 'input-error' : ''} />
                        {errors.name && (<p className="error-message">{errors.name.message}</p>)}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="you@example.com" {...register('email')} className={errors.email ? 'input-error' : ''} />
                        {errors.email && (<p className="error-message">{errors.email.message}</p>)}
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="••••••••" {...register('password')} className={errors.password ? 'input-error' : ''} />
                        {errors.password && (<p className="error-message">{errors.password.message}</p>)}
                    </div>

                    {/* Password Confirmation Field */}
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input id="password_confirmation" type="password" placeholder="••••••••" {...register('password_confirmation')} className={errors.password_confirmation ? 'input-error' : ''} />
                        {errors.password_confirmation && (<p className="error-message">{errors.password_confirmation.message}</p>)}
                    </div>

                    {/* Role Selection */}
                    <div className="form-group-role">
                        <label className="role-label">I am a...</label>
                        <div className="role-options">
                            <label className="radio-option">
                                <input type="radio" value="user" {...register('role')} />
                                Job Seeker
                            </label>
                            <label className="radio-option">
                                <input type="radio" value="employer" {...register('role')} />
                                Employer
                            </label>
                        </div>
                        {errors.role && (<p className="error-message error-message-role">{errors.role.message}</p>)}
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-register-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="register-footer">
                    Already have an account?
                    <Link to="/login" className="footer-link">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;