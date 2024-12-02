import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AereolineaForm from '../components/AereolineaForm';
import axios from 'axios';

const Aerolineas = () => {
  const [aerolineas, setAerolineas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchAerolineas = async (page) => {
    try {
      const response = await axios.post(
        'https://g4e89cro2l.execute-api.us-east-1.amazonaws.com/dev/aerolineasget',
        { token },
      );
      const data = JSON.parse(response.data.body);
      
      const aerolineasData = data.aerolineas.map((aerolinea) => ({
        nombre: aerolinea.nombre?.S,
        pais_origen: aerolinea.pais_origen?.S,
        tenant_id: aerolinea.tenant_id?.S,
      }));

      setAerolineas(aerolineasData.slice((page - 1) * 5, page * 5));
      setTotalPages(Math.ceil(data.aerolineas.length / 5));
    } catch (error) {
      console.error('Error fetching aerolineas:', error);
    }
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleVerVuelos = (tenantId) => {
    navigate(`/vuelos/${tenantId}`);
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
            <Typography variant="h6">{aerolinea.nombre || 'Nombre no disponible'}</Typography>
            <Typography variant="body2">País de Origen: {aerolinea.pais_origen || 'País no disponible'}</Typography>
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
              onClick={() => handleVerVuelos(aerolinea.tenant_id)}
            >
              Ver Vuelos
            </Button>
          </Box>
        ))}
      </Box>

      <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              backgroundColor: '#e31c22',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#b71c1c',
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#9e1b1b',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#7a1414',
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Aerolineas;
