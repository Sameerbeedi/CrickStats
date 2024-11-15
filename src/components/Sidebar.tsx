import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  Calendar, 
  Trophy, 
  BarChart3,
  Home
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/players', icon: Users, label: 'Players' },
    { to: '/teams', icon: Shield, label: 'Teams' },
    { to: '/matches', icon: Calendar, label: 'Matches' },
    { to: '/series', icon: Trophy, label: 'Series' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-[calc(100vh-4rem)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {links.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === to
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;