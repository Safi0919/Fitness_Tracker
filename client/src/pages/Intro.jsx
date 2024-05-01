import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

const Intro = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phoneNum: "",
  });

  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogUser(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user.email.includes('@')) {
      alert('Invalid email format!');
      return;
    }
    if (user.phoneNum.length !== 10) {
      alert('Phone number must be 10 characters long!');
      return;
    }
    if (user.password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    if (user.username.length < 4) {
      alert('Username must be at least 4 characters long!');
      return;
    }

    try {
      const res = await axios.post("http://localhost:8800/users", user);
      console.log(res.data);

      if (res.status === 200) {
        setSuccessMessage('Registration successful!');
        setUser({
          username: "",
          password: "",
          email: "",
          phoneNum: "",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setSuccessMessage('Username already exists!');
      } else {
        console.log(err);
        alert('An error occurred while processing your request!');
      }
    }
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/login", logUser);
      console.log(res.status);
      console.log(res.data);

      if (res.status === 200) {
        localStorage.setItem('userid', res.data.userid);
        console.log(localStorage.getItem('userid'));
        login();
      }
      if (res.status === 401) {
        alert("Invalid username or password!");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className='p-3.5'>
      <h1 className="text-center text-5xl font-bold">
        Welcome to the Fitness Tracker!
      </h1>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center border-2 rounded-xl flex border-black">
          <div className="flex-1 p-2 relative">
            <p className="text-xl">Already have an account?</p>
            <Link to="/login"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-2 border-blue-500 hover:border-blue-700 w-40">Login</button></Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
              <div className="bg-gray-400 h-0.5 w-10"></div>
            </div>
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 bg-white px-2">or</p>
          </div>
          <div className="flex-1 p-2 relative">
            <p className="text-xl">Are you a new user?</p>
            <Link to="/register"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-2 border-blue-500 hover:border-blue-700 w-40">Register</button></Link>
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <div>
          <h2>Login</h2>
          <input type="text" placeholder='Username' onChange={handleLoginChange} name="username" />
          <input type="password" placeholder='Password' onChange={handleLoginChange} name="password" />
          <button onClick={handleLoginClick}>Login</button>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <h2>Sign Up</h2>
          <input type="text" placeholder='Username' value={user.username} onChange={handleChange} name="username" />
          <input type="text" placeholder='Email' value={user.email} onChange={handleChange} name="email" />
          <input type="text" placeholder='Phone Number' value={user.phoneNum} onChange={handleChange} name="phoneNum" />
          <input type="password" placeholder='Password' value={user.password} onChange={handleChange} name="password" />
          <button onClick={handleClick}>Sign Up</button>
          {successMessage && <p>{successMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default Intro;