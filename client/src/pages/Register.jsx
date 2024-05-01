import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Register = () => {
    const { isLoggedIn, login } = useContext(AuthContext);
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
    <div>{!isLoggedIn && (
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
  )
}

export default Register