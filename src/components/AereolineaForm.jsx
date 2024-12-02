import React, { useState } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate para redirigir

const AereolineaForm = () => {
  const [codigo, setCodigo] = useState('');  // Código de aerolínea (o tenant_id)
  const [vuelos, setVuelos] = useState([]);  // Vuelos asociados a la aerolínea
  const navigate = useNavigate();  // Inicializamos useNavigate

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'https://g4e89cro2l.execute-api.us-east-1.amazonaws.com/dev/aerolineasget',
        { token }
      );
      const data = JSON.parse(response.data.body);
      
      // Buscamos la aerolínea por su tenant_id
      const aerolinea = data.aerolineas.find(aero => aero.tenant_id?.S === codigo);  // Buscar por tenant_id

      if (aerolinea) {
        // Si encontramos la aerolínea, redirigimos a la página de vuelos
        navigate(`/vuelos/${aerolinea.tenant_id?.S}`);  // Redirigimos usando el tenant_id
      } else {
        // Si no encontramos la aerolínea, mostramos un mensaje
        setVuelos([]);
        alert('Aerolínea no encontrada');
      }
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: 600, margin: '0 auto' }}>
      <Stack spacing={2}>
        <TextField
          label="Tenant ID de la Aerolínea"  // Lo cambiamos para hacer referencia al tenant_id
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
