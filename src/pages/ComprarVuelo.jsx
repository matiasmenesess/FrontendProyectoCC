import React from 'react';
import { Box, Typography } from '@mui/material';
import Comprar from '../components/Comprar';

const ComprarVuelo = () => {
  return (
    <Box sx={{ padding: '20px', maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Comprar Vuelo
      </Typography>
      <Comprar />
    </Box>
  );
};

export default ComprarVuelo;
