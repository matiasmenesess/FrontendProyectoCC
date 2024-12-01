import axios from 'axios';

// URL base de tu API Gateway (asegúrate de reemplazar esto con la URL real de tu API Gateway)
const API_URL = 'https://6bk8qafhu6.execute-api.us-east-1.amazonaws.com/dev';  // URL base actualizada

// Función para hacer login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      user_id: email,
      password: password,
    });
    return response.data; // Devuelve el token si el login es exitoso
  } catch (error) {
    console.error('Error en login:', error);
    throw new Error('Error al intentar iniciar sesión');
  }
};

// Función para crear un nuevo usuario
export const signUpUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      user_id: email,
      password: password,
    });
    return response.data; // Devuelve mensaje de éxito
  } catch (error) {
    console.error('Error en sign up:', error);
    throw new Error('Error al intentar registrarse');
  }
};
