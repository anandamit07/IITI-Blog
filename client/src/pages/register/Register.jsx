import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/api/auth/register",{
        username,
        email,
        password,
      });
      //res.data && window.location.replace("/login")
      setsuccess(true);
    } catch (error) {
      setError(true);
    }
    
  }
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label style={{color:'wheat'}}>Username</label>
            <input type="text" 
            className='registerInput' 
            placeholder='Enter your username'
            onChange={e=>setUsername(e.target.value)}/>
            <label style={{color:'wheat'}}>Email</label>
            <input type="text" 
            className='registerInput' 
            placeholder='Enter your email'
            onChange={e=>setEmail(e.target.value)}/>
            <label style={{color:'wheat'}}>Password</label>
            <input type="password" className='registerInput' 
            placeholder='Enter your password'
            onChange={e=>setPassword(e.target.value)} />
            <button className='registerButton'>Register</button>
        </form>
        <button className='registerLoginButton'><Link className='link' to={'/login'}> Login</Link></button>
      {error?<span style={{color:"red", marginTop:"10px"}}>Something went wrong <br/> Username should be unique <br/> E-mail should be unique</span>:<></>}
      {success?<span style={{color:"green", marginTop:"10px"}}>Verification E-mail has been sent</span>:<></>}
    </div>
  )
}
