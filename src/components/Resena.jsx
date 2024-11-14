import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';

const Resena = () => {
  const reviews = [
    { id: 1, text: 'Excelente servicio y puntualidad.', author: 'Juan Pérez' },
    { id: 2, text: 'Muy buena experiencia, asientos cómodos.', author: 'Ana Gómez' },
  ];

  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reseñas de la Aerolínea
      </Typography>
      <Stack spacing={2}>
        {reviews.map((review) => (
          <Paper key={review.id} sx={{ padding: '10px' }}>
            <Typography variant="body1">{review.text}</Typography>
            <Typography variant="subtitle2" color="textSecondary">- {review.author}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Resena;
