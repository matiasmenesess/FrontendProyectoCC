import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Pagination } from '@mui/material';
import AereolineaForm from '../components/AereolineaForm';
import axios from 'axios';

const Aerolineas = () => {
  const [aerolineas, setAerolineas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [vuelos, setVuelos] = useState([]);

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');  

  // Obtener aerolíneas
  const fetchAerolineas = async (page) => {
    try {
      const response = await axios.post(
        'https://g4e89cro2l.execute-api.us-east-1.amazonaws.com/dev/aerolineasget',
        { token },
      );
      const data = JSON.parse(response.data.body);
      setAerolineas(data.aerolineas.slice((page - 1) * 5, page * 5)); // Limitar a 5 por página
      setTotalPages(Math.ceil(data.aerolineas.length / 5));  // Total de páginas
    } catch (error) {
      console.error('Error fetching aerolineas:', error);
    }
  };

  // Obtener vuelos de una aerolínea específica
  const fetchVuelos = async (tenantId) => {
    try {
      const response = await axios.post('https://dl3xptohd4.execute-api.us-east-1.amazonaws.com/dev/vuelosget');
      const data = JSON.parse(response.data.body);
      // Filtrar vuelos que coinciden con el tenant_id de la aerolínea
      setVuelos(data);
    } catch (error) {
      console.error('Error fetching vuelos:', error);
    }
  };

  // Manejar el cambio de página
  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  // Manejar el clic en "Ver Vuelos"
  const handleVerVuelos = (tenantId) => {
    fetchVuelos(tenantId);
  };

  useEffect(() => {
    fetchAerolineas(page);
  }, [page]);

  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Aerolíneas Disponibles
      </Typography>
      <AereolineaForm />
      
      <Box>
        {aerolineas.map((aerolinea, index) => (
          <Box key={index} sx={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <Typography variant="h6">{aerolinea.nombre?.S || 'Nombre no disponible'}</Typography>
            <Typography variant="body2">País de Origen: {aerolinea.pais_origen?.S || 'País no disponible'}</Typography>
            <Button 
              variant="contained" 
              sx={{
                marginTop: '10px',
                backgroundColor: '#e31c22',
                '&:hover': {
                  backgroundColor: '#b71c1c',
                },
                borderRadius: '8px',
                padding: '10px 20px',
              }}
              onClick={() => handleVerVuelos(aerolinea.id?.S)}  // Llamar a la función con el id de la aerolínea
            >
              Ver Vuelos
            </Button>
          </Box>
        ))}
      </Box>

      {/* Mostrar vuelos filtrados */}
      <Box sx={{ marginTop: '30px' }}>
        {vuelos.length > 0 ? (
          vuelos.map((vuelo, index) => (
            <Box key={index} sx={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
              <Typography variant="h6">Código: {vuelo.codigo?.S}</Typography>
              <Typography variant="body2">Origen: {vuelo.origen?.S}</Typography>
              <Typography variant="body2">Destino: {vuelo.destino?.S}</Typography>
              <Typography variant="body2">Fecha de Salida: {vuelo.fecha_salida?.S}</Typography>
              <Typography variant="body2">Fecha de Llegada: {vuelo.fecha_llegada?.S}</Typography>
              <Typography variant="body2">Capacidad: {vuelo.capacidad?.N}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" align="center">No hay vuelos disponibles para esta aerolínea.</Typography>
        )}
      </Box>

      {/* Paginación */}
      <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              backgroundColor: '#e31c22', // Color de fondo de los botones
              color: '#fff', // Color de texto (números blancos)
              '&:hover': {
                backgroundColor: '#b71c1c', // Hover de los botones
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#9e1b1b', // Rojo más oscuro para la página seleccionada
              '&:hover': {
                backgroundColor: '#7a1414', // Rojo más oscuro cuando se pasa el mouse
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Aerolineas;
