import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [logUser, setLogUser] = useState({
        username: "",
        password: ""
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogUser(prev => ({ ...prev, [name]: value }));
        console.log(logUser);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLoginClick(e);
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
        } catch (err) {
            console.log(err.response.data);
            if (err.response && err.response.status === 401) {
                setSuccessMessage("Invalid username or password!");
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="space-y-4">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                </div>
                <form className="space-y-4">
                    <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Username</label>
                    <input type="text" name="username" onKeyPress={handleKeyPress} onChange={handleLoginChange} className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'/>
                    </div>
                    <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Password</label>
                    <input name="password" type="password" onChange={handleLoginChange} onKeyPress={handleKeyPress} className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'/>
                    </div>
                    {successMessage && <label className='text-red-600 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{successMessage}</label>}
                    <button onClick={handleLoginClick} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                        Login
                    </button>
                </form>
                <div className="text-center">
                    <Link className="text-gray-500 hover:text-gray-700" to="/register">
                        Don't have an account? Sign up here.
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

/*









<!--
// v0 by Vercel.
// https://v0.dev/t/TbWTnv3E4J4
-->

<div class="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
  <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
    <div class="space-y-4">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-gray-500 dark:text-gray-400">Enter your credentials to access your account.</p>
      </div>
      <form class="space-y-4">
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="username"
          >
            Username
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="username"
            placeholder="johndoe"
            required=""
            type="text"
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="password"
          >
            Password
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="password"
            required=""
            type="password"
          />
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          type="submit"
        >
          Login
        </button>
      </form>
      <div class="text-center">
        <a class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" href="#">
          Don't have an account? Sign up here
        </a>
      </div>
    </div>
  </div>
</div>
*/