import React, { useState, useEffect } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { playerApi } from '../services/api';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState([]);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [playerToCheck, setPlayerToCheck] = useState('');

  const columns = [
    { header: 'ID', accessor: 'Player_ID' },
    { header: 'Name', accessor: 'Player_Name' },
    { header: 'Age', accessor: 'Player_Age' },
    { header: 'Team', accessor: 'Player_Team' },
    { header: 'Role', accessor: 'Player_Role' },
    { header: 'Type', accessor: 'Player_Type' }
  ];

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async (search = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await playerApi.getPlayers(search);
      if (data.success) {
        setPlayers(data.players);
        setError(null);
      } else {
        setError(data.message || 'Error fetching players');
        setPlayers([]);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
      setError('Failed to fetch players. Please try again.');
      setPlayers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPlayerExists = async () => {
    if (!playerToCheck.trim()) {
      setError('Please enter a player name to check');
      return;
    }

    setIsChecking(true);
    setCheckResult(null);
    setError(null);

    try {
      const data = await playerApi.checkPlayer(playerToCheck);
      if (data.success) {
        setCheckResult({
          exists: data.exists,
          message: data.message
        });
      } else {
        throw new Error(data.message || 'Error checking player');
      }
    } catch (error) {
      console.error('Error checking player:', error);
      setError('Failed to check player. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm) {
        fetchPlayers(searchTerm);
      } else {
        fetchPlayers();
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const playerName = formData.get('Player_Name');

      // Check if player exists before adding
      const checkData = await playerApi.checkPlayer(playerName);
      if (checkData.exists) {
        setError('Player already exists in the database');
        setIsSubmitting(false);
        return;
      }

      const newPlayerData = {
        Player_Name: playerName,
        Player_Age: parseInt(formData.get('Player_Age')),
        Player_Team: formData.get('Player_Team'),
        Player_Role: formData.get('Player_Role'),
        Player_Type: formData.get('Player_Type')
      };

      const data = await playerApi.addPlayer(newPlayerData);
      if (data.success) {
        setPlayers(prevPlayers => [...prevPlayers, data.player]);
        setShowAddPlayer(false);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to add player');
      }
    } catch (error) {
      console.error('Error adding player:', error);
      setError(error.message || 'Failed to add player. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkPlayerExists();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Players</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          onClick={() => setShowAddPlayer(true)}
        >
          <Plus className="h-4 w-4" />
          Add Player
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search players..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Check if player exists..."
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={playerToCheck}
            onChange={(e) => setPlayerToCheck(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 whitespace-nowrap"
            onClick={checkPlayerExists}
            disabled={isChecking || !playerToCheck.trim()}
          >
            {isChecking ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </div>
            ) : (
              'Check Player'
            )}
          </button>
        </div>
      </div>

      {checkResult && (
        <div 
          className={`p-4 ${
            checkResult.exists 
              ? 'bg-yellow-50 text-yellow-800 border-yellow-200' 
              : 'bg-green-50 text-green-800 border-green-200'
          } border rounded-md flex items-center justify-between`}
        >
          <span>{checkResult.message}</span>
          <button
            onClick={() => setCheckResult(null)}
            className="text-sm hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded-md text-center">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
        </div>
      )}

      {!isLoading && !error && players.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No players found
        </div>
      )}

      {players.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.accessor}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.map((player) => (
                <tr key={player.Player_ID}>
                  {columns.map((column) => (
                    <td
                      key={`${player.Player_ID}-${column.accessor}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {player[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-2xl mx-4">
            <h2 className="text-xl font-semibold mb-4">Add Player</h2>
            <form onSubmit={handleAddPlayer}>
              {['Name', 'Age', 'Team', 'Role', 'Type'].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {field}
                  </label>
                  <input
                    type={field === 'Age' ? 'number' : 'text'}
                    name={`Player_${field}`}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setShowAddPlayer(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding...
                    </div>
                  ) : (
                    'Add Player'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;