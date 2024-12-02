import React from 'react';
import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from '../components/HeaderLogin';
import EmailIcon from '@mui/icons-material/Email';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f4f5',
      }}
    >
      <HeaderLogin />

      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 4,
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              color: '#1f2937',
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            Bienvenido a tu próximo viaje
          </Typography>

          <Stack direction="column" spacing={2} sx={{ marginTop: 3 }}>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              onClick={() => navigate('/login/signin')}
              sx={{
                textTransform: 'none',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#e31c22',
                borderColor: '#e31c22',
                '&:hover': {
                  backgroundColor: '#e31c22',
                  color: '#ffffff',
                  borderColor: '#e31c22',
                },
              }}
            >
              Acceder con tu email
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate('/login/signup')}
              sx={{
                textTransform: 'none',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#e31c22',
                borderColor: '#e31c22',
                '&:hover': {
                  backgroundColor: '#e31c22',
                  color: '#ffffff',
                  borderColor: '#e31c22',
                },
              }}
            >
              Regístrate
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
