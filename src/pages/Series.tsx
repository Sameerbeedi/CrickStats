import React, { useState } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { Table } from '../components/Table';

const Series = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSeries, setShowAddSeries] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    { header: 'ID', accessor: 'Series_ID' },
    { header: 'Name', accessor: 'Series_Name' },
    { header: 'Type', accessor: 'Series_Type' },
    { header: 'Host', accessor: 'Host_Country' },
    { header: 'Start Date', accessor: 'Series_start' },
    { header: 'End Date', accessor: 'Series_end' },
    { header: 'Winner', accessor: 'Winner' }
  ];

  const handleAddSeries = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const seriesData = {
        Series_Name: formData.get('Series_Name'),
        Series_Type: formData.get('Series_Type'),
        Host_Country: formData.get('Host_Country'),
        Series_start: formData.get('Series_start'),
        Series_end: formData.get('Series_end'),
        Participating_Teams: JSON.parse(formData.get('Participating_Teams')),
        Total_Matches: parseInt(formData.get('Total_Matches')),
        Winner: formData.get('Winner')
      };

      // Add API call here
      console.log('Series Data:', seriesData);
      setShowAddSeries(false);
    } catch (error) {
      console.error('Error adding series:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Series</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700"
          onClick={() => setShowAddSeries(true)}
        >
          <Plus className="h-4 w-4" />
          Add Series
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search series..."
          className="pl-10 pr-4 py-2 w-full border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table columns={columns} data={[]} />

      {showAddSeries && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4">
            <h2 className="text-xl font-semibold mb-4">Add New Series</h2>
            <form onSubmit={handleAddSeries} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Series Name</label>
                  <input
                    type="text"
                    name="Series_Name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Series Type</label>
                  <select
                    name="Series_Type"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="Bilateral">Bilateral</option>
                    <option value="Tri-series">Tri-series</option>
                    <option value="World Cup">World Cup</option>
                    <option value="League">League</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Host Country</label>
                  <input
                    type="text"
                    name="Host_Country"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Matches</label>
                  <input
                    type="number"
                    name="Total_Matches"
                    required
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="Series_start"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="Series_end"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Participating Teams (JSON format)
                  </label>
                  <textarea
                    name="Participating_Teams"
                    required
                    placeholder='["Team1", "Team2"]'
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Winner</label>
                  <input
                    type="text"
                    name="Winner"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddSeries(false)}
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
                    'Add Series'
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

export default Series;