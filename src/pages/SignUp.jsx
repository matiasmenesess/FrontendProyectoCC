import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Stack, Link, IconButton, InputAdornment, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from '../components/HeaderLogin';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        setError(true);
      } else {
        setError(false);
        setStep(2); // Pasar al siguiente formulario
      }
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://6bk8qafhu6.execute-api.us-east-1.amazonaws.com/dev/usuarios/crear', {
        method: 'POST',
        body: JSON.stringify({
          user_id: email,
          password: password,
        }),
      });
      console.log(email)
      console.log(password)
      if (response.ok) {
        setSuccessAlert(true);
        setTimeout(() => {
          navigate('/login', { state: { email: email } });
        }, 2000); // Redirige a login después de 2 segundos
      } else {
        // Manejar error si la creación del usuario falla
        setError(true);
      }
    } catch (error) {
      console.log(email)
      console.log(password)
      console.error("Error al crear la cuenta:", error);
      setError(true);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f2f4f5', padding: 4 }}>
      <HeaderLogin />
      <Card sx={{ width: '100%', maxWidth: 450, minHeight: 400, padding: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 4, marginTop: '3rem' }}>
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ marginBottom: 3 }}>
            <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ color: '#e31c22', textDecoration: 'none', fontWeight: 'bold' }}>Inicia sesión</Link>
            <Typography variant="body2" sx={{ color: '#1f2937' }}>{'>'}</Typography>
            <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 'bold' }}>Crear una cuenta</Typography>
          </Stack>

          {successAlert && (
            <Alert severity="success" sx={{ marginBottom: 3 }}>Cuenta creada correctamente. Redirigiendo a la página de inicio de sesión...</Alert>
          )}

          {step === 1 && (
            <>
              <Typography variant="h5" component="h1" align="left" sx={{ fontFamily: 'Poppins, sans-serif', color: '#1f2937', fontWeight: 600, marginBottom: 3 }}>Crea tu cuenta</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 1 }}>EMAIL</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                placeholder='nombre@ejemplo.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                helperText={error ? 'Este campo es requerido o el formato es incorrecto' : ''}
                sx={{ marginBottom: 4 }}
              />
              <Button variant="contained" onClick={handleNext} sx={{ textTransform: 'none', fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 'bold', backgroundColor: '#e31c22', width: '100%' }}>Siguiente</Button>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h5" component="h1" align="left" sx={{ fontFamily: 'Poppins, sans-serif', color: '#1f2937', fontWeight: 600, marginBottom: 3 }}>Crea tu cuenta</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 1 }}>CONTRASEÑA</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                placeholder='Ejemplo123'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: 3 }}
              />
              <Typography variant="body2" sx={{ marginBottom: 3 }}>
                ✔ 8 caracteres &nbsp; ✔ Una mayúscula &nbsp; ✔ Una minúscula &nbsp; ✔ Un número
              </Typography>
              <Button variant="contained" onClick={handleSignUp} sx={{ textTransform: 'none', fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 'bold', backgroundColor: '#e31c22', width: '100%' }}>Crear una cuenta</Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
