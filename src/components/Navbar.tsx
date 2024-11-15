import React from 'react';
import { Cricket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Cricket className="h-8 w-8" />
            <span className="text-xl font-bold">CrickStats</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-md">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;