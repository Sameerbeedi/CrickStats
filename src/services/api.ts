import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  async login(email: string, password: string) {
    const response = await api.post('/login', { email, password });
    return response.data;
  },

  async signup(data: { 
    username: string; 
    email: string; 
    password: string; 
    role?: string; 
  }) {
    const response = await api.post('/signup', data);
    return response.data;
  },

  async testConnection() {
    const response = await api.get('/api/test');
    return response.data;
  }
};

export default api;