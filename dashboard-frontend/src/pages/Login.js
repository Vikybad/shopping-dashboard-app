import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const Login = ({ showSnackbar }) => {
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const navigate = useNavigate();
  const { login, token } = useContext(AuthContext);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', loginData);
      if (response?.data?.msg) throw new Error(response.data.msg);
      if (!response?.data?.token) throw new Error(`Some error occured`);
      let generatedToken = response?.data?.token;
      login(generatedToken);

      showSnackbar({
        message: 'Login success! Redirecting to dashboard...',
        severity: 'success',
        autoHideDuration: 1500,
        redirectToPath: '/home'
      });

    } catch (error) {
      console.error(`Error in signup: ${error.message}`);
      showSnackbar({
        message: `Login failed: ${error.message}`,
        severity: 'error',
        autoHideDuration: 6000
      });
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 300, margin: 'auto', mt: 7 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="login"
        label="Username/Email/Mobile"
        value={loginData.login}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="password"
        label="Password"
        type="password"
        value={loginData.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSignupRedirect}
      >
        Signup
      </Button>

    </Box>
  );
};

export default Login;