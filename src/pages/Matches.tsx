import React, { useState } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { Table } from '../components/Table';

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    { header: 'ID', accessor: 'Match_ID' },
    { header: 'Date', accessor: 'Match_Date' },
    { header: 'Format', accessor: 'Match_Format' },
    { header: 'Team A', accessor: 'Team_A' },
    { header: 'Team B', accessor: 'Team_B' },
    { header: 'Venue', accessor: 'Match_Venue' }
  ];

  const handleAddMatch = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const matchData = {
        Match_Date: formData.get('Match_Date'),
        Match_Format: formData.get('Match_Format'),
        Team_A: formData.get('Team_A'),
        Team_B: formData.get('Team_B'),
        Match_Venue: {
          ground: formData.get('Ground'),
          city: formData.get('City'),
          country: formData.get('Country')
        }
      };

      // Add API call here
      console.log('Match Data:', matchData);
      setShowAddMatch(false);
    } catch (error) {
      console.error('Error adding match:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Matches</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700"
          onClick={() => setShowAddMatch(true)}
        >
          <Plus className="h-4 w-4" />
          Add Match
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search matches..."
          className="pl-10 pr-4 py-2 w-full border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table columns={columns} data={[]} />

      {showAddMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4">
            <h2 className="text-xl font-semibold mb-4">Add New Match</h2>
            <form onSubmit={handleAddMatch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="Match_Date"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Format</label>
                  <select
                    name="Match_Format"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="T20I">T20I</option>
                    <option value="ODI">ODI</option>
                    <option value="Test">Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team A</label>
                  <input
                    type="text"
                    name="Team_A"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team B</label>
                  <input
                    type="text"
                    name="Team_B"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Venue Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ground</label>
                    <input
                      type="text"
                      name="Ground"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="City"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      name="Country"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMatch(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Adding...
                    </div>
                  ) : (
                    'Add Match'
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

export default Matches;