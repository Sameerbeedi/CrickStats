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

export const playerApi = {
  async getPlayers(search?: string) {
    const response = await api.get(`/api/players${search ? `?search=${search}` : ''}`);
    return response.data;
  },

  async checkPlayer(name: string) {
    const response = await api.get(`/api/players/check/${encodeURIComponent(name)}`);
    return response.data;
  },

  async addPlayer(playerData: {
    Player_Name: string;
    Player_Age: number;
    Player_Team: string;
    Player_Role: string;
    Player_Type: string;
  }) {
    const response = await api.post('/api/players', playerData);
    return response.data;
  },

  async deletePlayer(playerId: string) {
    const response = await api.delete(`/api/players/${playerId}`);
    return response.data;
  }
};

export const teamApi = {
  async getTeams(search?: string) {
    const response = await api.get(`/api/teams${search ? `?search=${search}` : ''}`);
    return response.data;
  },

  async checkTeam(name: string) {
    const response = await api.get(`/api/teams/check/${encodeURIComponent(name)}`);
    return response.data;
  },

  async addTeam(teamData: {
    Team_Name: string;
    Team_Coach?: string;
  }) {
    const response = await api.post('/api/teams', teamData);
    return response.data;
  }
};

export const matchApi = {
  async getMatches(search?: string) {
    const response = await api.get(`/api/matches${search ? `?search=${search}` : ''}`);
    return response.data;
  },

  async addMatch(matchData: {
    Match_Date: string;
    Match_Format: string;
    Team_A: string;
    Team_B: string;
    
  }) {
    const response = await api.post('/api/matches', matchData);
    return response.data;
  }
};

export const seriesApi = {
  async getSeries(search?: string) {
    const response = await api.get(`/api/series${search ? `?search=${search}` : ''}`);
    return response.data;
  },

  async addSeries(seriesData: {
    Series_Name: string;
    Series_Type: string;
    Host_Country: string;
    Series_start: string;
    Series_end: string;
    Participating_Teams: string[];
    Total_Matches: number;
    Winner?: string;
  }) {
    const response = await api.post('/api/series', seriesData);
    return response.data;
  }
};

export default api;