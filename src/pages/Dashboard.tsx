import React from 'react';
import { Users, Trophy, Calendar, BarChart2 } from 'lucide-react';
import ConnectionTest from '../components/ConnectionTest';

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Players', value: '150', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Teams', value: '12', icon: Trophy, color: 'bg-green-500' },
    { title: 'Upcoming Matches', value: '8', icon: Calendar, color: 'bg-purple-500' },
    { title: 'Reports Generated', value: '45', icon: BarChart2, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Connection Test Component */}
      <ConnectionTest />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Matches</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((match) => (
              <div key={match} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">Team A vs Team B</p>
                  <p className="text-sm text-gray-500">March {match + 14}, 2024</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Top Performers</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((player) => (
              <div key={player} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Player {player}</p>
                    <p className="text-sm text-gray-500">Team {player}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">Score: {90 + player}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;  