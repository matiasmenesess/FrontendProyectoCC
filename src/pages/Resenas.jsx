import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Resenas = () => {
  const { tenantId, idVuelo } = useParams();
  const navigate = useNavigate();
  const [resenas, setResenas] = useState([]);

  const fetchResenas = async () => {
    try {
      const response = await axios.post('https://1zjv6rnb4l.execute-api.us-east-1.amazonaws.com/dev/reviewsGet', {
        id_vuelo: idVuelo,
      });

      const data = JSON.parse(response.data.body);

      if (Array.isArray(data.reseñas)) {
        setResenas(data.reseñas);
      } else {
        console.error('La respuesta de la API no contiene un array de reseñas.');
        setResenas([]);
      }
    } catch (error) {
      console.error('Error fetching reseñas:', error);
      setResenas([]);
    }
  };

  useEffect(() => {
    fetchResenas();
  }, [idVuelo]);

  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reseñas de Vuelo {idVuelo}
      </Typography>

      <Stack spacing={2}>
        {resenas.length === 0 ? (
          <Typography variant="body1" align="center">No hay reseñas disponibles para este vuelo.</Typography>
        ) : (
          resenas.map((resena, index) => (
            <Box key={index} sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="body2"><strong>Comentario:</strong> {resena.comentario}</Typography>
              <Typography variant="body2"><strong>Calificación:</strong> {resena.calificacion} estrellas</Typography>
              <Typography variant="body2"><strong>Fecha:</strong> {new Date(resena.fecha_resena).toLocaleDateString()}</Typography>
              <Typography variant="body2"><strong>Usuario:</strong> {resena.user_id}</Typography>
            </Box>
          ))
        )}
      </Stack>

      <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: '#e31c22', '&:hover': { backgroundColor: '#b71c1c' } }} 
          onClick={() => navigate(`/aerolineas`)}
        >
          Volver a Aerolineas
        </Button>
      </Stack>
    </Box>
  );
};

export default Resenas;
