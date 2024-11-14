import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeaderLogin from './components/HeaderLogin';
import Navbar from './components/Navbar';
import FlightSearchForm from './components/FlightSearchForm';
import Aerolineas from './pages/Aerolíneas';
import ComprarVuelo from './pages/ComprarVuelo';
import Destinos from './pages/Destinos';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerResenaAereolinea from './pages/VerResenaAereolinea';
import Vuelos from './pages/Vuelos';

// Componente para manejar el layout principal
function MainLayout() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/login/signin', '/login/signup'];

  return (
    <div>
      <HeaderLogin />
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<FlightSearchForm />} />
        <Route path="/aerolineas" element={<Aerolineas />} />
        <Route path="/comprar" element={<ComprarVuelo />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/signin" element={<SignIn />} />
        <Route path="/login/signup" element={<SignUp />} />
        <Route path="/ver-resena" element={<VerResenaAereolinea />} />
        <Route path="/vuelos" element={<Vuelos />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
