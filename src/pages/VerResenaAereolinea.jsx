import React from 'react';
import { Box, Typography } from '@mui/material';
import Resena from '../components/Resena';

const VerResenaAereolinea = () => {
  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reseñas de la Aerolínea
      </Typography>
      <Resena />
    </Box>
  );
};

export default VerResenaAereolinea;
