import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const HeaderLogin = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 2rem',
        backgroundColor: 'white',
        boxShadow: 'none',
        zIndex: 1000,
      }}
    >
      <Box display="flex" alignItems="center" sx={{ marginLeft: '20rem' }}>
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

      <IconButton aria-label="ayuda" sx={{ color: '#737578', marginRight: '20rem', fontWeight: 'bold' }}>
        <HelpOutlineIcon />
        <Typography variant="body2" sx={{ marginLeft: '0.3rem' }}>
          Ayuda
        </Typography>
      </IconButton>
    </Box>
  );
};

export default HeaderLogin;
