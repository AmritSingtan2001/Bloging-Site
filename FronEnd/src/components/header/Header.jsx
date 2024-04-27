import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">My Blog</div>
        <ul className="flex space-x-4">
          <li><Link to={"/"} className="text-white hover:text-gray-300">Home</Link></li>
          <li><Link to={"/login"} className="text-white hover:text-gray-300">Login</Link></li>
          <li><Link to={"/register"} className="text-white hover:text-gray-300">Register</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header