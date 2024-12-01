import React, { useState } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';

const AereolineaForm = () => {
  const [codigo, setCodigo] = useState('');
  const [vuelos, setVuelos] = useState([]);

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');  

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'https://g4e89cro2l.execute-api.us-east-1.amazonaws.com/dev/aerolineasget',
        { token }
      );
      const data = JSON.parse(response.data.body);
      const aerolinea = data.aerolineas.find(aero => aero.codigo.S === codigo);
      if (aerolinea) {
        // Simular los vuelos de esa aerolínea
        setVuelos([ /* Aquí irían los vuelos de la aerolínea */ ]);
      } else {
        setVuelos([]);
      }
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: 600, margin: '0 auto' }}>
      <Stack spacing={2}>
        <TextField
          label="Código de la Aerolínea"
          variant="outlined"
          fullWidth
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderWidth: '2px',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: '#e31c22',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
            borderRadius: '8px',
            padding: '10px 20px',
          }}
        >
          Buscar Vuelos
        </Button>
        {vuelos.length > 0 && (
          <Box sx={{ marginTop: '20px' }}>
            {vuelos.map((vuelo, index) => (
              <Typography key={index}>Vuelo: {vuelo}</Typography>
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default AereolineaForm;
