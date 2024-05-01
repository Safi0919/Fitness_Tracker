import React from 'react'
//import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
//import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

// Might delete later, using User page to grab data
const Profile = () => {
    const [user, setUserID] = useState({
      userid:"",
      username:""
    });

    //const navigate = useNavigate();
    const location = useLocation();

    const userid = location.pathname.split("/")[1];

    console.log(location.pathname.split("/")[1]);

    const handleClick = async e => {
        e.preventDefault()
        try {
          const res = await axios.get("http://localhost:8800/users/" + userid)
          setUserID(res.data)
        } catch (err) {
          console.log(err);
        }
    }

    console.log(user);
  return (
    <div>
        <h1>Profile</h1>
        <h2>{user.userid}</h2>
        <input type="text" placeholder='name' name="name"/>
        <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Profile