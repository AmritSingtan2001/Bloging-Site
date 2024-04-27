import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 absolute bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2024 My Blog</p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-gray-400">
              About Us
            </a>
            <a href="#" className="text-sm hover:text-gray-400">
              Contact
            </a>
            <a href="#" className="text-sm hover:text-gray-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
