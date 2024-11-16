import React, { useState } from 'react';
import { Table } from '../components/Table';
import { Search, Plus } from 'lucide-react';

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { header: 'ID', accessor: 'Match_ID' },
    { header: 'Date', accessor: 'Match_Date' },
    { header: 'Format', accessor: 'Match_Format' },
    { header: 'Team A', accessor: 'Team_A' },
    { header: 'Team B', accessor: 'Team_B' },
    { header: 'Venue', accessor: 'Match_Venue' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Matches</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700">
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
    </div>
  );
};

export default Matches;