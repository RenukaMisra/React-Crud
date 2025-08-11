import * as React from 'react';
import { Container, Typography, TextField, Button , Box } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../Context/AuthProvider';

const Login = () => {
  const [email,setEmail]= useState('')
  const [password, setPassword] =useState('')

 
  const  { secureLogin } = useAuth();

  const handleLogin = () => {
    secureLogin(email,password);
  };

  
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      <Box component="form">
        <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)}/>
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;