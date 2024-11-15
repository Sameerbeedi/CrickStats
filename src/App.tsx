import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import { Home, Users, Trophy, Calendar, BarChart2, FileText } from 'lucide-react';

// Import pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Coaches from './pages/Coaches';
import Teams from './pages/Teams';
import Matches from './pages/Matches';
import Series from './pages/Series';
import Reports from './pages/Reports';

const App = () => {
  // TODO: Replace with actual auth check
  const isAuthenticated = false;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Players', path: '/players', icon: Users },
    { name: 'Coaches', path: '/coaches', icon: Users },
    { name: 'Teams', path: '/teams', icon: Trophy },
    { name: 'Matches', path: '/matches', icon: Calendar },
    { name: 'Series', path: '/series', icon: FileText },
    { name: 'Reports', path: '/reports', icon: BarChart2 },
  ];

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-indigo-600">CrickStats</h1>
          </div>
          <nav className="mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/players" element={<Players />} />
              <Route path="/coaches" element={<Coaches />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/series" element={<Series />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import { Home, Users, Trophy, Calendar, BarChart2, FileText } from 'lucide-react';

// // Import pages
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Players from './pages/Players';
// import Teams from './pages/Teams';
// import Matches from './pages/Matches';
// import Series from './pages/Series';
// import Reports from './pages/Reports';
// import Coaches from './pages/Coaches';

// const App = () => {
//   const navItems = [
//     { name: 'Dashboard', path: '/dashboard', icon: Home },
//     { name: 'Players', path: '/players', icon: Users },
//     { name: 'Coaches', path: '/coaches', icon: Users },
//     { name: 'Teams', path: '/teams', icon: Trophy },
//     { name: 'Matches', path: '/matches', icon: Calendar },
//     { name: 'Series', path: '/series', icon: FileText },
//     { name: 'Reports', path: '/reports', icon: BarChart2 },
//   ];

//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100">
//         {/* Sidebar */}
//         <div className="w-64 bg-white shadow-sm">
//           <div className="p-4">
//             <h1 className="text-2xl font-bold text-indigo-600">CrickStats</h1>
//           </div>
//           <nav className="mt-4">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                 >
//                   <Icon className="h-5 w-5 mr-3" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 overflow-auto">
//           <div className="p-8">
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/players" element={<Players />} />
//               <Route path="/coaches" element={<Coaches />} />
//               <Route path="/teams" element={<Teams />} />
//               <Route path="/matches" element={<Matches />} />
//               <Route path="/series" element={<Series />} />
//               <Route path="/reports" element={<Reports />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="*" element={<Navigate to="/dashboard" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
