
import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f2f4f5',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        marginTop: '60px',
      }}
    >
      <Stack direction="row" spacing={4}>
        <Button onClick={() => navigate('/aerolineas')} color="inherit">Aerolíneas</Button>
        <Button onClick={() => navigate('/vuelos')} color="inherit">Vuelos</Button>
            <Button onClick={() => navigate('/destinos')} color="inherit">Destinos</Button>
      </Stack>
    </Box>
  );
};

export default Navbar;
