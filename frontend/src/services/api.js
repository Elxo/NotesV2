import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api'  // This ensures requests go to /api/* on your backend
});

// Add token if present
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = async (email, password) => {
  const { data } = await API.post('/auth/register', { email, password });
  return data;
};

export const login = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data;
};

// Notes APIs
export const getNotes = async () => {
  const { data } = await API.get('/notes');
  return data;
};

export const createNote = async (title, content) => {
  const { data } = await API.post('/notes', { title, content });
  return data;
};

export const updateNote = async (id, title, content) => {
  const { data } = await API.put(`/notes/${id}`, { title, content });
  return data;
};

export const deleteNote = async id => {
  const { data } = await API.delete(`/notes/${id}`);
  return data;
};

export default API;
