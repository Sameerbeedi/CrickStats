const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const fetchPlayers = async (searchTerm = '') => {
  const response = await fetch(
    `${API_BASE_URL}/api/players${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`
  );
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const checkPlayerExists = async (playerName) => {
  const response = await fetch(`${API_BASE_URL}/api/players/check/${encodeURIComponent(playerName)}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const addPlayer = async (playerData) => {
  const response = await fetch(`${API_BASE_URL}/api/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerData),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};