import React from "react";

const Connect = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-300 to-blue-400">
      <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Connect with Us</h2>

        <label className="block">
          <span className="text-gray-700 font-medium">Name</span>
          <input
            type="text"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
            placeholder="Enter your name"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Email</span>
          <input
            type="email"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
            placeholder="Enter your email"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Organization</span>
          <input
            type="text"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
            placeholder="Enter your organization"
          />
        </label>
        
 
        <button className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-500 hover:shadow-md transition-all duration-300 ease-in-out">
          Request Authentication
        </button>
      </div>
    </div>
  );
};

export default Connect;