import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    // <div className="flex items-center justify-center h-screen">
    //     <div className="flex flex-col justify-center items-center w-1/2 border-2 rounded-xl border-black bg-gray-600">
    //     <h2 className="text-center text-4xl font-bold mt-5 mb-10">Sign Up</h2>
    //       <input type="text" onKeyPress={handleKeyPress} placeholder='Username' value={user.username} onChange={handleChange} name="username" className='mb-4 border-2 rounded-md text-xl'/>
    //       <input type="text" onKeyPress={handleKeyPress} placeholder='Email' value={user.email} onChange={handleChange} name="email" className='mb-4 border-2 rounded-md text-xl'/>
    //       <input type="text" onKeyPress={handleKeyPress} placeholder='Phone Number' value={user.phoneNum} onChange={handleChange} name="phoneNum" className='mb-4 border-2 rounded-md text-xl'/>
    //       <input type="password" onKeyPress={handleKeyPress} placeholder='Password' value={user.password} onChange={handleChange} name="password" className='border-2 rounded-md text-xl'/>
    //       {successMessage && <p className={successMessage === 'Registration successful!' ? 'text-white' : 'text-red-600'}>{successMessage}</p>}
    //       <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-2 border-blue-500 hover:border-blue-700 w-40 mb-5 mt-10">Sign Up</button>
    //       <Link to="/" className='text-white mb-3'>Return to Home Page</Link>
    //     </div>
    // </div>


    <div class="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
      <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div class="space-y-4">
          <div class="space-y-2 text-center">
            <h1 class="text-3xl font-bold">Register</h1>
          </div>
          <form class="space-y-4">
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Username
              </label>
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="username"
                type="text"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            </div>
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="email"
                type="text"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            </div>
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone Number
              </label>
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="phoneNum"
                placeholder="Enter your phone number"
                type="text"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            </div>
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="password"
                placeholder="Enter your password"
                type="password"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            </div>
            {successMessage && <p className={successMessage === 'Registration successful!' ? 'text-green-700' : 'text-red-600'}>{successMessage}</p>}
            <button
              class="text-white bg-gray-900 hover:bg-gray-800 hover:text-gray-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              onClick={handleClick}
            >
              Register
            </button>
          </form>
          <div class="text-center">
            <Link class="text-sm text-gray-500 hover:text-gray-700" to="/Login">
              Already have an account? Log in here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
