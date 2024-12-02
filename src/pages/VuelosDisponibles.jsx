import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const VuelosDisponibles = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [vuelos, setVuelos] = useState([]);

  const fetchVuelos = async () => {
    try {
      const response = await axios.post('https://k13gnh9gka.execute-api.us-east-1.amazonaws.com/dev/vuelosget', {
        tenant_id: tenantId,
      });

      const data = JSON.parse(response.data.body);

      if (Array.isArray(data.vuelos)) {
        setVuelos(data.vuelos);
      } else {
        console.error('La respuesta de la API no contiene un array de vuelos.');
        setVuelos([]);
      }
    } catch (error) {
      console.error('Error fetching vuelos:', error);
      setVuelos([]);
    }
  };

  useEffect(() => {
    fetchVuelos();
  }, [tenantId]);

  const handleVerResena = (idVuelo) => {
    navigate(`/resenas/${idVuelo}`);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Vuelos Disponibles para {tenantId}
      </Typography>

      <Stack spacing={2}>
        {vuelos.length === 0 ? (
          <Typography variant="body1" align="center">No hay vuelos disponibles en este momento.</Typography>
        ) : (
          vuelos.map((vuelo, index) => (
            <Box key={index} sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h6">Vuelo: {vuelo.id_vuelo}</Typography>
              <Typography variant="body2">Código: {vuelo.codigo}</Typography>
              <Typography variant="body2">Origen: {vuelo.origen}</Typography>
              <Typography variant="body2">Destino: {vuelo.destino}</Typography>
              <Typography variant="body2">Fecha de Salida: {new Date(vuelo.fecha_salida).toLocaleString()}</Typography>
              <Typography variant="body2">Fecha de Llegada: {new Date(vuelo.fecha_llegada).toLocaleString()}</Typography>
              <Typography variant="body2">Capacidad: {vuelo.capacidad} pasajeros</Typography>
              <Button 
                variant="contained" 
                sx={{ marginTop: '10px', backgroundColor: '#e31c22', '&:hover': { backgroundColor: '#b71c1c' } }}
                onClick={() => handleVerResena(vuelo.id_vuelo)}
              >
                Ver Reseña
              </Button>
            </Box>
          ))
        )}
      </Stack>

      <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
        <Button variant="contained" color="error" onClick={() => navigate('/aerolineas')}>
          Volver a Aerolíneas
        </Button>
      </Stack>
    </Box>
  );
};

export default VuelosDisponibles;
