import React from 'react';
import { Box, Typography } from '@mui/material';
import AereolineaForm from '../components/AereolineaForm';
import Resena from '../components/Resena';

const Aerolineas = () => {
  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Aerolíneas Disponibles
      </Typography>
      <AereolineaForm />
      <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: 4 }}>
        Reseñas de Aerolíneas
      </Typography>
      <Resena />
    </Box>
  );
};

export default Aerolineas;
