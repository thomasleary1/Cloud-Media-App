import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/users/register`, { username, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data;
};