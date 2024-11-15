import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar } from 'lucide-react';

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700">
          <Plus className="h-5 w-5" />
          <span>Schedule Match</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search matches..."
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

      <div className="space-y-4">
        {[1, 2, 3].map((match) => (
          <div key={match} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="text-lg font-semibold">Team A vs Team B</h3>
                  <p className="text-sm text-gray-500">ODI Match #{match}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">March {match + 14}, 2024</p>
                <p className="text-sm text-gray-500">14:00 GMT</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-medium">Lords Cricket Ground</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Format</p>
                <p className="font-medium">ODI</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Scheduled
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;