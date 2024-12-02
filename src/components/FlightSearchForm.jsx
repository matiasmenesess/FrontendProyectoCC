import React, { useState } from 'react';
import { Box, TextField, Button, Stack, Typography, MenuItem } from '@mui/material';
import axios from 'axios';

const FlightSearchForm = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaIda, setFechaIda] = useState('');
  const [fechaVuelta, setFechaVuelta] = useState('');
  const [clase, setClase] = useState('Economy');
  const [pasajeros, setPasajeros] = useState(1);
  const [vuelos, setVuelos] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'https://k13gnh9gka.execute-api.us-east-1.amazonaws.com/dev/vuelosDestOrg',
        {
          origen,
          destino,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data) {
        const data = response.data;
        if (data.vuelos && data.vuelos.length > 0) {
          setVuelos(data.vuelos);
          setError(null);
        } else {
          setVuelos([]);
          setError('No se encontraron vuelos');
        }
      } else {
        setError('Error al buscar vuelos');
        setVuelos([]);
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError('Error en la conexión');
      setVuelos([]);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#d32f2f', padding: '20px', borderRadius: '8px', maxWidth: 800, margin: '20px auto', color: '#fff' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Búsqueda de Vuelos
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <TextField
          label="Origen"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#fff' }}
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        />
        <TextField
          label="Destino"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#fff' }}
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <TextField
          label="Fecha de Ida"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ backgroundColor: '#fff' }}
          value={fechaIda}
          onChange={(e) => setFechaIda(e.target.value)}
        />
        <TextField
          label="Fecha de Vuelta"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ backgroundColor: '#fff' }}
          value={fechaVuelta}
          onChange={(e) => setFechaVuelta(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <TextField
          label="Clase"
          select
          fullWidth
          sx={{ backgroundColor: '#fff' }}
          value={clase}
          onChange={(e) => setClase(e.target.value)}
        >
          <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="First">First</MenuItem>
        </TextField>
        <TextField
          label="Pasajeros"
          type="number"
          fullWidth
          sx={{ backgroundColor: '#fff' }}
          value={pasajeros}
          onChange={(e) => setPasajeros(e.target.value)}
        />
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleSearch}
          sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#e57373' } }}
        >
          Buscar
        </Button>
      </Stack>

      {error && (
        <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {vuelos.length > 0 ? (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Vuelos Disponibles
          </Typography>
          {vuelos.map((vuelo, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Vuelo:</strong> {vuelo.id_vuelo.S} | <strong>Fecha de Salida:</strong> {vuelo.fecha_salida.S} | <strong>Fecha de Llegada:</strong> {vuelo.fecha_llegada.S}
              </Typography>
              <Typography variant="body2">
                <strong>Origen:</strong> {vuelo.origen.S} | <strong>Destino:</strong> {vuelo.destino.S} | <strong>Capacidad:</strong> {vuelo.capacidad.S} | <strong>Código:</strong> {vuelo.codigo.S}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        !error && (
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            No hay vuelos disponibles para esta búsqueda.
          </Typography>
        )
      )}
    </Box>
  );
};

export default FlightSearchForm;
