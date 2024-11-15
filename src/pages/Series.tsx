import React, { useState } from 'react';
import { Search, Filter, Plus, Trophy } from 'lucide-react';

const Series = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Series</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700">
          <Plus className="h-5 w-5" />
          <span>Create Series</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search series..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((series) => (
          <div key={series} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-50 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Series {series}</h3>
                <p className="text-sm text-gray-500">Bilateral Series</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Host Country</p>
                <p className="font-medium">England</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Matches</p>
                <p className="font-medium">5</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">Mar 15, 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">Mar 30, 2024</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series;