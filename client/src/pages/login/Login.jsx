import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import './login.css'
import img1 from '../../assets/login.jpg'
import {Input, Button} from '@chakra-ui/react'
import { useState } from 'react';
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [errMess, setErrMess] = useState('Error');
  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post("/api/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      // console.log(res);
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }
    catch(err){
      setError(true);
      setErrMess(err.response.data);
      dispatch({type: "LOGIN_FAILURE"});
    }
  }
  return (
    <div className="login">
        <span className="loginTitle">LOGIN</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label style={{color:'wheat'}}>Username</label>
            <Input type="text" className='loginInput' placeholder='Enter your username' required ref={userRef}/>
            <label style={{color:'wheat'}}>Password</label>
            <Input type="password" className='loginInput' placeholder='Enter your password' required ref={passwordRef} />
            <button className='loginButton' type='submit' disabled={isFetching}>Login</button>
            {error?<span style={{color:"red", marginTop:"10px"}}>{errMess}</span>:<></>}
        </form>
        <Button variant={'red.500'} className='loginRegisterButton'><Link className='link' to={'/register'}>Register</Link></Button>
    </div>
  )
}
