import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Welcome = () => {
    const [users, setusers] = useState([]);

    // Retrieves all users (Remove/Change)
    useEffect(()=>{
        const fetchAllUsers = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/users");
                console.log(res);
                setusers(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllUsers();
    },[])



  return (
    <div>
        <h1>Welcome!</h1>
        <div className="user">
            {users.map(user=>(
                <div className="user">
                    <h2>{user.username}</h2>
                    <h2>{user.email}</h2>
                    <h2>{user.phoneNum}</h2>
                    <h2>{user.password}</h2>
                    <button className="navigate"><Link to={`${user.username}/`}>Navigate</Link></button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Welcome