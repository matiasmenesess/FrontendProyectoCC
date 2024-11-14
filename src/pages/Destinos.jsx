import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

const Destinos = () => {
  const destinations = ["París, Francia", "Tokio, Japón", "Nueva York, USA", "Londres, Reino Unido", "Sídney, Australia"];

  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Destinos Populares
      </Typography>
      <Stack spacing={2}>
        {destinations.map((destination, index) => (
          <Box key={index} padding="10px" borderBottom="1px solid #ddd">
            <Typography variant="body1">{destination}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Destinos;
