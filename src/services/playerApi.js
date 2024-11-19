import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend base URL
});

export const playerApi = {
  async getPlayers() {
    const response = await api.get('/api/players'); // GET all players
    return response.data;
  },

  async deletePlayer(playerId) {
    const response = await api.delete(`/api/players/${playerId}`); // DELETE player by ID
    return response.data;
  },
};
