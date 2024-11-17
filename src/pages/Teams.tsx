import React, { useState, useEffect } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { teamApi } from '../services/api'; // Ensure the correct path for your API service

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState([]);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    { header: 'ID', accessor: 'Team_ID' },
    { header: 'Name', accessor: 'Team_Name' },
    { header: 'Coach', accessor: 'Team_Coach' },
  ];

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async (search = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await teamApi.getTeams(search);
      console.log(data); // Log the response for debugging
      if (data.success) {
        setTeams(data.teams);
        setError(null);
      } else {
        setError(data.message || 'Error fetching teams');
        setTeams([]);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError('Failed to fetch teams. Please try again.');
      setTeams([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm) {
        fetchTeams(searchTerm);
      } else {
        fetchTeams();
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleAddTeam = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const newTeamData = {
        Team_Name: formData.get('Team_Name'),
        Team_Coach: formData.get('Team_Coach'),
      };

      const data = await teamApi.addTeam(newTeamData);
      if (data.success) {
        setTeams(prevTeams => [...prevTeams, data.team]);
        setShowAddTeam(false);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to add team');
      }
    } catch (error) {
      console.error('Error adding team:', error);
      setError(error.message || 'Failed to add team. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          onClick={() => setShowAddTeam(true)}
        >
          <Plus className="h-4 w-4" />
          Add Team
        </button>
      </div>

      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Search teams"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300"
        />
        <Search className="absolute top-3 right-3 text-gray-400" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gray-500 h-8 w-8" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {teams.length === 0 && !isLoading && !error && (
            <p className="text-gray-500">No teams found.</p>
          )}
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.accessor} className="border px-4 py-2">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.Team_ID}>
                  <td className="border px-4 py-2">{team.Team_ID}</td>
                  <td className="border px-4 py-2">{team.Team_Name}</td>
                  <td className="border px-4 py-2">
                    {/* Accessing the name and country of the coach */}
                    {team.Team_Coach?.name && team.Team_Coach?.country
                      ? `${team.Team_Coach.name} (${team.Team_Coach.country})`
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showAddTeam && (
        <form onSubmit={handleAddTeam} className="mt-6">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="Team_Name"
              placeholder="Team Name"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300"
            />
            <input
              type="text"
              name="Team_Coach"
              placeholder="Team Coach (JSON: { name: 'Name', country: 'Country' })"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-700 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Team'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Teams;
