import React from 'react';

const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">Register</button>
      </form>
    </div>
  );
};

export default Register;
