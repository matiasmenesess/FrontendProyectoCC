import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import FlightIcon from '@mui/icons-material/Flight';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CustomButton = styled(Button)(({ active }) => ({
  color: active ? 'red' : '#656567',
  fontWeight: active ? 'bold' : 'normal',
  fontSize: '13px', // Tamaño de fuente reducido
  textTransform: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px', // Menos espacio entre el icono y el texto
  minWidth: '70px', // Ancho mínimo reducido
  '& .MuiSvgIcon-root': {
    backgroundColor: active ? 'red' : 'transparent',
    color: active ? 'white' : '#656567',
    borderRadius: '50%',
    padding: active ? '4px' : '0', // Tamaño de padding más pequeño para el icono activo
    fontSize: '22px', // Tamaño de ícono reducido
  },
  '&:hover': {
    color: 'red',
  },
  borderBottom: active ? '2px solid red' : 'none',
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: '5px 0', // Reducción del padding vertical
        marginTop: '60px',
        boxShadow: 'none',
        border: 'none',
      }}
    >
      <Stack direction="row" spacing={3}>
        <CustomButton disableRipple onClick={() => navigate('/aerolineas')} active={isActive('/aerolineas')}>
          <AirlineSeatReclineExtraIcon />
          Aerolíneas
        </CustomButton>
        <CustomButton disableRipple onClick={() => navigate('/vuelos')} active={isActive('/vuelos')}>
          <FlightIcon />
          Vuelos
        </CustomButton>
        <CustomButton disableRipple onClick={() => navigate('/destinos')} active={isActive('/destinos')}>
          <LocationOnIcon />
          Destinos
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default Navbar;
