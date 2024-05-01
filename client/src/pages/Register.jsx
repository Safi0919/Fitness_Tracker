import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Register = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        phoneNum: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleClick(e);
      }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (user.username.length < 4) {
            setSuccessMessage('Username must be at least 4 characters long!');
          return;
        }
        if (!user.email.includes('@')) {
            setSuccessMessage('Invalid email.');
          return;
        }
        if (user.phoneNum.length !== 10) {
            setSuccessMessage('Invalid Phone Number.');
          return;
        }
        if (user.password.length < 8) {
            setSuccessMessage('Password must be at least 8 characters long.');
          return;
        }
    
        try {
            console.log(user);
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

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center items-center w-1/2 border-2 rounded-xl border-black bg-gray-600">
        <h2 className="text-center text-4xl font-bold mt-5 mb-10">Sign Up</h2>
          <input type="text" onKeyPress={handleKeyPress} placeholder='Username' value={user.username} onChange={handleChange} name="username" className='mb-4 border-2 rounded-md text-xl'/>
          <input type="text" onKeyPress={handleKeyPress} placeholder='Email' value={user.email} onChange={handleChange} name="email" className='mb-4 border-2 rounded-md text-xl'/>
          <input type="text" onKeyPress={handleKeyPress} placeholder='Phone Number' value={user.phoneNum} onChange={handleChange} name="phoneNum" className='mb-4 border-2 rounded-md text-xl'/>
          <input type="password" onKeyPress={handleKeyPress} placeholder='Password' value={user.password} onChange={handleChange} name="password" className='border-2 rounded-md text-xl'/>
          {successMessage && <p className={successMessage === 'Registration successful!' ? 'text-white' : 'text-red-600'}>{successMessage}</p>}
          <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-2 border-blue-500 hover:border-blue-700 w-40 mb-5 mt-10">Sign Up</button>
          <Link to="/" className='text-white mb-3'>Return to Home Page</Link>
        </div>
    </div>
  )
}

export default Register
