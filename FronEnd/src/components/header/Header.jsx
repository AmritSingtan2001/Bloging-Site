import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = !!sessionStorage.getItem('token'); // Check if user is authenticated based on token presence

  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Remove user information from session storage
    sessionStorage.removeItem('token'); // Remove token from session storage
    // Perform any additional cleanup or redirection after logout if needed
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">My Blog</div>
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
