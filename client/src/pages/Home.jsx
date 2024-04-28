// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { Link, useNavigate } from 'react-router-dom'
// import { useLocation } from 'react-router-dom';


// const Home = () => {
//     const [user, setUser] = useState({
//         username:"",
//         password:"",
//         email:"",
//         phoneNum:"",
//     });

//     const [logUser, setLogUser] = useState({
//         username:"",
//         password:""
//     });

//     const handleChange = (e) =>{
//         setUser(prev=>({...prev, [e.target.name]: e.target.value}));
//     };

//     const handleLoginChange = (e) =>{
//         setLogUser(prev=>({...prev, [e.target.name]: e.target.value}));
//     };

//     const handleLoginClick = async e => {
//         e.preventDefault();
//         try {
//             const res = await axios.get("http://localhost:8800/login/", logUser);
//             console.log(res.data);

//         } catch (err) {
//           console.log(err);
//         }
//     }

//     const handleClick = async e => {
//         e.preventDefault()
//         try {
//           await axios.post("http://localhost:8800/users/", user);
//         } catch (err) {
//           console.log(err);
//         }
//     }

//     console.log(user);
//     console.log(logUser);
//   return (
//     <div>
//         <h1>Home</h1>
//         <div>
//             <h2>Login</h2>
//             <input type="text" placeholder='username' onChange={handleLoginChange} name="username"/>
//             <input type="text" placeholder='Password' onChange={handleLoginChange} name="password"/>
//             <button onClick={handleLoginClick}>Login</button>
//         </div>
//         <div>
//             <h2>Sign Up</h2>
//             <input type="text" placeholder='username' onChange={handleChange} name="username"/>
//             <input type="text" placeholder='email' onChange={handleChange} name="email"/>
//             <input type="text" placeholder='Phone Number' onChange={handleChange} name="phoneNum"/>
//             <input type="text" placeholder='Password' onChange={handleChange} name="password"/>
//             <button onClick={handleClick}>Sign Up</button>
//         </div>
//     </div>
//   )
// }

// export default Home