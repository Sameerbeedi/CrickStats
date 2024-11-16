import React, { useState } from 'react';
import { Search, Filter, Download, BarChart3 } from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700">
          <Download className="h-5 w-5" />
          <span>Export All</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search reports..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((report) => (
          <div key={report} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Performance Report #{report}</h3>
                  <p className="text-sm text-gray-500">Team Analysis</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <Download className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Generated</span>
                <span className="font-medium">Mar {report + 10}, 2024</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Type</span>
                <span className="font-medium">Performance Analysis</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;