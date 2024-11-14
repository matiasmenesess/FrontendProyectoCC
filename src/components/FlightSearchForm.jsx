import React from 'react';
import { Box, TextField, Button, Stack, Typography, MenuItem } from '@mui/material';

const FlightSearchForm = () => {
  return (
    <Box sx={{ backgroundColor: '#3b0b70', padding: '20px', borderRadius: '8px', maxWidth: 800, margin: '20px auto', color: '#fff' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Búsqueda de Vuelos
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <TextField label="Origen" variant="outlined" fullWidth sx={{ backgroundColor: '#fff' }} />
        <TextField label="Destino" variant="outlined" fullWidth sx={{ backgroundColor: '#fff' }} />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <TextField label="Fecha de Ida" type="date" InputLabelProps={{ shrink: true }} fullWidth sx={{ backgroundColor: '#fff' }} />
        <TextField label="Fecha de Vuelta" type="date" InputLabelProps={{ shrink: true }} fullWidth sx={{ backgroundColor: '#fff' }} />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <TextField label="Clase" select fullWidth sx={{ backgroundColor: '#fff' }}>
          <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="First">First</MenuItem>
        </TextField>
        <TextField label="Pasajeros" type="number" fullWidth sx={{ backgroundColor: '#fff' }} />
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: 2 }}>
        <Button variant="contained" color="secondary">Buscar</Button>
      </Stack>
    </Box>
  );
};

export default FlightSearchForm;
