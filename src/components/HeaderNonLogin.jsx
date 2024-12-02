import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { useNavigate } from 'react-router-dom';

export const HeaderNonLogin = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        boxShadow: 'none',
        zIndex: 1000,
        padding: '0 1rem',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{
          backgroundColor: '#ffffff',
          padding: '0 1rem',
          marginRight: '1rem',
          height: '100%',
        }}
      >
        <Box
          component="img"
          src="/assets/logo.png"
          alt="cloudfly logo"
          sx={{
            height: 90,
            width: 'auto',
            marginRight: '1rem',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          marginLeft: '19em',
          backgroundColor: 'whitesmoke',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#e31c22',
            minHeight: '45px',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderBottomLeftRadius: '20px',
            marginRight: '1rem',
            minWidth: '180px',
          }}
        >
          <PhoneIcon sx={{ color: '#ffffff', marginRight: '0.5rem' }} />
          <Typography variant="body2">
            Para ventas <span style={{ fontWeight: 'bold' }}>0 800 7 8484</span>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', color: '#767e89', marginRight: '1rem' }}>
          <HelpOutlineIcon sx={{ marginRight: '0.3rem' }} />
          <Typography variant="body2">Ayuda</Typography>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: '#b0b0b0', height: '40px', alignSelf: 'center', marginRight: '1rem', width: '1px' }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', color: '#767e89', marginRight: '1rem' }}>
          <CardTravelIcon sx={{ marginRight: '0.3rem' }} />
          <Typography variant="body2">Mis Viajes</Typography>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: '#b0b0b0', height: '40px', alignSelf: 'center', marginRight: '1rem', width: '1px' }}
        />

        {!token ? (
          <Box
            onClick={() => navigate('/login')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '0.7rem 1rem',
              cursor: 'pointer',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            }}
          >
            <AccountCircleIcon sx={{ color: '#767e89', marginRight: '0.5rem' }} />
            <Typography variant="body2" sx={{ color: '#344358', fontWeight: 'bold' }}>
              Iniciar Sesión
            </Typography>
            <MenuIcon sx={{ color: '#767e89', marginLeft: '0.5rem' }} />
          </Box>
        ) : (
          <Box
            onClick={handleLogout}
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '0.7rem 1rem',
              cursor: 'pointer',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            }}
          >
            <AccountCircleIcon sx={{ color: '#767e89', marginRight: '0.5rem' }} />
            <Typography variant="body2" sx={{ color: '#344358', fontWeight: 'bold' }}>
              Cerrar Sesión
            </Typography>
            <MenuIcon sx={{ color: '#767e89', marginLeft: '0.5rem' }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HeaderNonLogin;
