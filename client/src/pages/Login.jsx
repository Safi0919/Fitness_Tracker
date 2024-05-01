import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom'

const Login = () => {
    const { isLoggedIn, login } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [logUser, setLogUser] = useState({
        username: "",
        password: ""
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogUser(prev => ({ ...prev, [name]: value }));
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
    <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center items-center w-1/2 border-2 rounded-xl border-black bg-gray-600">
            <h2 className="text-center text-4xl font-bold mt-5 mb-10">Login</h2>
            <input type="text" placeholder='Username' onChange={handleLoginChange} name="username" className='mb-4 border-2 rounded-md text-xl'/>
            <input type="password" placeholder='Password' onChange={handleLoginChange} name="password" className='mb-10 border-2 rounded-md text-xl'/>
            <button onClick={handleLoginClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-2 border-blue-500 hover:border-blue-700 w-40 mb-5">Login</button>
            <Link to="/" className='text-white mb-3'>Return to Home Page</Link>
        </div>  
    </div>

  )
}

export default Login