import React from 'react';
import { Box, Typography } from '@mui/material';
import FlightSearchForm from '../components/FlightSearchForm';

const Vuelos = () => {
  return (
    <Box sx={{ padding: '20px', maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Búsqueda de Vuelos
      </Typography>
      <FlightSearchForm />
    </Box>
  );
};

export default Vuelos;
