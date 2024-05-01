import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

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
    <div>
        {!isLoggedIn && (
        <div>
          <h2>Login</h2>
          <input type="text" placeholder='Username' onChange={handleLoginChange} name="username" />
          <input type="password" placeholder='Password' onChange={handleLoginChange} name="password" />
          <button onClick={handleLoginClick}>Login</button>
        </div>
      )}
      </div>
  )
}

export default Login