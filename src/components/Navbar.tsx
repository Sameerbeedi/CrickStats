import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, Calendar, Trophy, Home } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Players', icon: Users, path: '/players' },
    { name: 'Teams', icon: Shield, path: '/teams' },
    { name: 'Matches', icon: Calendar, path: '/matches' },
    { name: 'Series', icon: Trophy, path: '/series' }
  ];

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">CrickStats</span>
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;