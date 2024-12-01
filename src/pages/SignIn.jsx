import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Stack, Link, InputAdornment, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from '../components/HeaderLogin';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { loginUser } from '../api'; // Importa la función loginUser

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null); // Estado para almacenar el token

  const handleNext = () => {
    if (step === 1) {
      // Verificar si el campo de correo electrónico es válido
      if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        setError(true);
      } else {
        setError(false);
        setStep(2); // Pasar al siguiente formulario
      }
    }
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password); // Llamar a la función loginUser
      setToken(data.token); // Almacena el token recibido
      navigate('/dashboard'); // Redirige al dashboard
    } catch (error) {
      setError(true); // Muestra error si no se pudo hacer login
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f2f4f5', padding: 4 }}>
      <HeaderLogin />
      <Card sx={{ width: '100%', maxWidth: 450, minHeight: 500, padding: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 4, marginTop: '3rem' }}>
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ marginBottom: 3 }}>
            <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ color: '#e31c22', textDecoration: 'none', fontWeight: 'bold' }}>
              Crear una cuenta
            </Link>
            <Typography variant="body2" sx={{ color: '#1f2937' }}>{'>'}</Typography>
            <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
              Ingresar a Mi Cuenta
            </Typography>
          </Stack>

          {step === 1 && (
            <>
              <AccountCircle sx={{ fontSize: 60, color: '#1f2937', marginBottom: 2 }} />
              <Typography variant="h5" component="h1" align="left" sx={{ fontFamily: 'Poppins, sans-serif', color: '#1f2937', fontWeight: 600, marginBottom: 3 }}>
                ¿Cuál es tu email?
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                placeholder="minombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                helperText={error ? 'Este campo es requerido o el formato es incorrecto' : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: 4 }}
              />
              <Button variant="contained" onClick={handleNext} sx={{ textTransform: 'none', fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 'bold', backgroundColor: '#e31c22', width: '100%' }}>
                Siguiente
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h5" component="h1" align="left" sx={{ fontFamily: 'Poppins, sans-serif', color: '#1f2937', fontWeight: 600, marginBottom: 3 }}>
                Ingresa tu contraseña
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                placeholder="Ejemplo123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: 3 }}
              />
              <Button variant="contained" onClick={handleLogin} sx={{ textTransform: 'none', fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 'bold', backgroundColor: '#e31c22', width: '100%' }}>
                Ingresar
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
