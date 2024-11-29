import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';

const Destinos = () => {
  const destinations = [
    { name: "París, Francia", wiki: "https://es.wikipedia.org/wiki/París" },
    { name: "Tokio, Japón", wiki: "https://es.wikipedia.org/wiki/Tokio" },
    { name: "Nueva York, USA", wiki: "https://es.wikipedia.org/wiki/Nueva_York" },
    { name: "Londres, Reino Unido", wiki: "https://es.wikipedia.org/wiki/Londres" },
    { name: "Sídney, Australia", wiki: "https://es.wikipedia.org/wiki/Sídney" },
  ];

  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Destinos Populares
      </Typography>
      <Stack spacing={2}>
        {destinations.map((destination, index) => (
          <Box
            key={index}
            padding="10px"
            border="1px solid #ddd"
            borderRadius="8px"
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.1)"
          >
            <Typography variant="h6" gutterBottom>
              {destination.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href={destination.wiki}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en Wikipedia
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Destinos;

