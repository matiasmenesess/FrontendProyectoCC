import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const Comprar = () => {
  return (
    <Box sx={{ padding: '20px', maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Compra de Boletos
      </Typography>
      <Typography variant="body1" gutterBottom>
        Selecciona los detalles para completar tu compra.
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" color="primary">
          Proceder al Pago
        </Button>
        <Button variant="outlined" color="secondary">
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};

export default Comprar;
