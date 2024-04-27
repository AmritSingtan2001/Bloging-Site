import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">My Blog</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <div
                className="relative"
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <span className="text-white cursor-pointer ">
                  Welcome, {JSON.parse(sessionStorage.getItem('user')).name}
                </span>
                {showDropdown && (
                  <ul className="absolute right-0 bg-gray-800 w-52 text-white py-2 rounded-md shadow-lg">
                    <li>
                      <Link
                        to="/all-blogs"
                        className="block  w-full px-4 py-2 hover:bg-gray-700"
                      >
                        Your Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/create-post"
                        className="block  w-full px-4 py-2 hover:bg-gray-700"
                      >
                        Add New Blog
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
