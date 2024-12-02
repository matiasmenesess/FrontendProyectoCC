import React, { useState } from 'react';
import { Box, TextField, Button, Stack, Typography, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const Vuelos = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaIda, setFechaIda] = useState('');
  const [fechaVuelta, setFechaVuelta] = useState('');
  const [pasajeros, setPasajeros] = useState(1);
  const [vuelos, setVuelos] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('user123@example.com');

  const handleSearch = async () => {
    try {
      console.log("Buscando vuelos...");
      console.log("Origen:", origen);
      console.log("Destino:", destino);

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

      console.log("Respuesta de la API:", response);

      if (response.status === 200 && response.data) {
        const data = JSON.parse(response.data.body);
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

  const handleComprar = async (vuelo) => {
    const fechaCompra = new Date().toISOString().split('T')[0];
    const precioTotal = vuelo.precio.S * pasajeros;

    const compraData = {
      user_id: userId,
      id_vuelo: vuelo.id_vuelo.S,
      fecha_compra: fechaCompra,
      cantidad_boletos: pasajeros,
      precio_total: precioTotal.toString(),
    };

    try {
      const response = await axios.post(
        'https://g51bo9i9y9.execute-api.us-east-1.amazonaws.com/dev/compras',
        compraData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Compra realizada con éxito');
      } else {
        alert('Error en la compra');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Hubo un error al procesar la compra');
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom color="error">
        Búsqueda de Vuelos
      </Typography>

      <Box
        sx={{
          backgroundColor: '#ffebee',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: 800,
          margin: '20px auto',
          border: '2px solid #f44336',
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Filtrar Búsqueda de Vuelos
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
      </Box>

      {vuelos.length > 0 ? (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" align="center" gutterBottom color="error">
            Vuelos Disponibles
          </Typography>
          <Grid container spacing={3}>
            {vuelos.map((vuelo, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: '#fff0f0', border: '2px solid #f44336', borderRadius: '8px' }}>
                  <CardContent>
                    <Typography variant="h6" color="error">
                      <strong>Vuelo:</strong> {vuelo.id_vuelo.S}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Origen:</strong> {vuelo.origen.S} | <strong>Destino:</strong> {vuelo.destino.S}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Capacidad:</strong> {vuelo.capacidad.S} pasajeros
                    </Typography>
                    <Stack direction="row" justifyContent="center" sx={{ marginTop: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleComprar(vuelo)}
                        sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#e57373' } }}
                      >
                        Comprar
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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

export default Vuelos;
