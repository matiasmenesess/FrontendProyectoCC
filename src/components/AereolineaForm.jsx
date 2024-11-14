import React from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';

const AereolineaForm = () => {
  return (
    <Box sx={{ padding: '20px', maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Buscar Aerolíneas
      </Typography>
      <Stack spacing={2}>
        <TextField label="Nombre de la Aerolínea" variant="outlined" fullWidth />
        <TextField label="Código de la Aerolínea" variant="outlined" fullWidth />
        <Button variant="contained" color="primary">
          Buscar
        </Button>
      </Stack>
    </Box>
  );
};

export default AereolineaForm;
