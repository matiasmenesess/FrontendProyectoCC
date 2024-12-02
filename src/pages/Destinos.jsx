import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, Pagination } from '@mui/material';
import axios from 'axios';

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);  // Estado para almacenar los destinos
  const [page, setPage] = useState(1);  // Estado para la página actual
  const [totalPages, setTotalPages] = useState(1);  // Total de páginas para la paginación

  // Función para obtener destinos del backend
  const fetchDestinos = async (pageNumber = 1) => {
    try {
      const response = await axios.post('https://m30oie9cj2.execute-api.us-east-1.amazonaws.com/dev/destinosget');
      const data = JSON.parse(response.data.body);  // Parseamos el JSON

      // Ordenamos los destinos por popularidad de mayor a menor
      const sortedDestinos = data.destinos.sort((a, b) => b.popularidad - a.popularidad);

      // Paginamos los destinos
      const itemsPerPage = 5;
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const paginatedDestinos = sortedDestinos.slice(startIndex, startIndex + itemsPerPage);

      // Calculamos el total de páginas
      const totalDestinos = sortedDestinos.length;
      const totalPagesCalculated = Math.ceil(totalDestinos / itemsPerPage);

      // Actualizamos el estado con los destinos y la paginación
      setDestinos(paginatedDestinos);
      setTotalPages(totalPagesCalculated);
    } catch (error) {
      console.error('Error fetching destinos:', error);
    }
  };

  // Llamamos a la función de obtener destinos cuando se monta el componente o cambia la página
  useEffect(() => {
    fetchDestinos(page);  // Pasamos la página actual
  }, [page]);

  // Función para manejar el cambio de página
  const handlePageChange = (event, value) => {
    setPage(value);  // Actualizamos la página actual
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Destinos Populares
      </Typography>
      <Stack spacing={2}>
        {destinos.length === 0 ? (
          <Typography variant="body1" align="center">No hay destinos disponibles.</Typography>
        ) : (
          destinos.map((destino) => (
            <Box
              key={destino.id_destino}
              padding="10px"
              border="1px solid #ddd"
              borderRadius="8px"
              boxShadow="2px 2px 5px rgba(0, 0, 0, 0.1)"
            >
              <Typography variant="h6" gutterBottom>
                {destino.ciudad}, {destino.pais}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {destino.descripcion}
              </Typography>
              <Button
                variant="contained"
                color="error"  // El botón será rojo
                href={`https://es.wikipedia.org/wiki/${destino.ciudad}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Wikipedia
              </Button>
            </Box>
          ))
        )}
      </Stack>

      <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
        <Pagination
          count={totalPages}  // Total de páginas
          page={page}  // Página actual
          onChange={handlePageChange}  // Cambio de página
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#e31c22',  // Rojo para las páginas no seleccionadas
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: '#b71c1c',  // Rojo oscuro para la página seleccionada
              color: '#fff',  // Texto blanco en la página seleccionada
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: '#f1b0b7',  // Color de fondo rojo claro al pasar el cursor
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Destinos;
