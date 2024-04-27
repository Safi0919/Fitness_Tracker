import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const Home = () => {
    const [user, setUser] = useState({
        username:"",
        email:"",
        phoneNum:"",
        password:""
    });

    const handleChange = (e) =>{
        setUser(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e => {
        e.preventDefault()
        try {
          await axios.post("http://localhost:8800/users/")
        } catch (err) {
          console.log(err);
        }
    }

  return (
    <div>
        <h1>Home</h1>
        <h2>Login</h2>
        <input type="text" placeholder='Username' onChange={handleChange} name="username"/>
        <input type="text" placeholder='email' onChange={handleChange} name="email"/>
        <input type="text" placeholder='Phone Number' onChange={handleChange} name="phoneNum"/>
        <input type="text" placeholder='Password' onChange={handleChange} name="password"/>
        <button onClick={handleClick}>Sign Up</button>
    </div>
  )
}

export default Home