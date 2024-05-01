import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <div className>
      <h1 className="text-center text-5xl font-bold">
        Welcome to the Fitness Tracker!
      </h1>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center border-2 rounded-xl flex border-black bg-gray-600">
          <div className="flex-1 p-2 relative">
            <p className="text-xl">Already have an account?</p>
            <Link to="/login"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-2 border-blue-500 hover:border-blue-700 w-40">Login</button></Link>
          </div>
          <div className="relative">
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 bg-gray-600 px-2">or</p>
          </div>
          <div className="flex-1 p-2 relative">
            <p className="text-xl">Are you a new user?</p>
            <Link to="/register"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-2 border-blue-500 hover:border-blue-700 w-40">Register</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;