import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';


const Signup = ({ showSnackbar }) => {

    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        image: '',
    });

    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', signupData);
            if (response?.data?.msg) throw new Error(response.data.msg);
            if (!response?.data?.token) throw new Error(`Some error occured`);

            showSnackbar({
                message: 'Signup successful! Redirecting to login...',
                severity: 'success',
                autoHideDuration: 1500
            });

        } catch (error) {
            console.error(`Error in signup: ${error.message}`);
            showSnackbar({
                message: `Signup failed: ${error.message}`,
                severity: 'error',
                autoHideDuration: 6000
            });
        }
    };

    const handleSignInRedirect = () => {
        navigate('/login');
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 300, margin: 'auto', mt: 7 }}>
            <Typography variant="h4" gutterBottom>
                Signup
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                name="username"
                label="Username"
                value={signupData.username}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                type="email"
                value={signupData.email}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                name="mobileNumber"
                label="Mobile Number"
                value={signupData.mobileNumber}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                value={signupData.password}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                name="image"
                label="Profile Image URL"
                value={signupData.image}
                onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Sign up
            </Button>

            <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSignInRedirect}
            >
                Log IN
            </Button>

        </Box>
    );
};

export default Signup;
