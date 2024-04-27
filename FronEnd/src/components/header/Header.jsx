import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = !!sessionStorage.getItem('token'); 

  const handleLogout = () => {
    sessionStorage.removeItem('user'); 
    sessionStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl"> <Link to="/"> My Blog </Link></div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><span className="text-white">Welcome, {JSON.parse(sessionStorage.getItem('user')).name}</span></li>
              <li><button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
              <li><Link to="/register" className="text-white hover:text-gray-300">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
