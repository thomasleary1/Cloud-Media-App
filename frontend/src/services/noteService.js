import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createNote = async (title, content) => {
  const response = await axios.post(`${API_URL}/notes/create`, { title, content }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const getNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const updateNote = async (noteId, title, content) => {
  const response = await axios.put(`${API_URL}/notes/update`, { noteId, title, content }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await axios.delete(`${API_URL}/notes/delete`, {
    data: { noteId },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};