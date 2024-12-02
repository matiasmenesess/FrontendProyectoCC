import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, Pagination } from '@mui/material';
import axios from 'axios';

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDestinos = async (pageNumber = 1) => {
    try {
      const response = await axios.post('https://m30oie9cj2.execute-api.us-east-1.amazonaws.com/dev/destinosget');
      const data = JSON.parse(response.data.body);

      const sortedDestinos = data.destinos.sort((a, b) => b.popularidad - a.popularidad);

      const itemsPerPage = 5;
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const paginatedDestinos = sortedDestinos.slice(startIndex, startIndex + itemsPerPage);

      const totalDestinos = sortedDestinos.length;
      const totalPagesCalculated = Math.ceil(totalDestinos / itemsPerPage);

      setDestinos(paginatedDestinos);
      setTotalPages(totalPagesCalculated);
    } catch (error) {
      console.error('Error fetching destinos:', error);
    }
  };

  useEffect(() => {
    fetchDestinos(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
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
                color="error"
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
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#e31c22',
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: '#b71c1c',
              color: '#fff',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: '#f1b0b7',
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Destinos;
