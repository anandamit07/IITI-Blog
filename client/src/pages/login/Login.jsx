import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import './login.css'
import img1 from '../../assets/login.jpg'
import {Input, Button, Heading} from '@chakra-ui/react'
import { useState } from 'react';
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  const [email, setEmail] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [token, setToken] = useState(null);
  const [errMess, setErrMess] = useState('Error');
  const [errMess2, setErrMess2] = useState('Error');
  const [errMess3, setErrMess3] = useState('Error');
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
  const sendToken = async(e)=>{
    try {
      const res = await axios.put("/api/auth/forgetPassword",{
        email:email,
      });
      setSuccess2(true);
    } catch (error) {
      setError2(true);
      setErrMess2(error.response.data);
    }
  }
  const resetPassword = async(e) =>{
    try{
      const res = await axios.put("/api/auth/resetPassword",{
        token:token,
        password:newPass,
      });
      setSuccess(true);
    }catch(err){
      setError3(true);
      setErrMess3(err.response.data);
    }
    
  }
  return (
    <>
    {forgetPass?(<div className="login">
        <Heading color={'teal'}> Reset Password</Heading>
        <div className="loginForm">
            <label style={{color:'wheat'}}>Email</label>
            <Input type={'email'} className='loginInput' placeholder='Enter your email' required onChange={(e)=>setEmail(e.target.value)}/>
            <Button mt={5} onClick={sendToken}>Send token</Button>
            
            {error2?<span style={{color:"red", marginTop:"10px"}}>{errMess2}</span>:<></>}
            {success2?<span style={{color:"green", marginTop:"10px"}}>Token sent to e-mail</span>:<></>}
            <br/><br/>
            <label style={{color:'wheat'}}>New Password</label>
            <Input type="password" className='loginInput' placeholder='Enter your new password' required onChange={(e)=>setNewPass(e.target.value)} />
            <label style={{color:'wheat'}}>Token</label>
            <Input type="text" className='loginInput' placeholder='Enter the token' required onChange={(e)=>setToken(e.target.value)}/>
            <button className='loginButton' onClick={resetPassword}>Reset</button>
            {error3?<span style={{color:"red", marginTop:"10px"}}>{errMess3}</span>:<></>}
            {success?<span style={{color:"green", marginTop:"10px"}}>Password reset success</span>:<></>}
        </div>
        <button className='loginRegisterButton' onClick={(e)=>setForgetPass(false)}>Login</button>
    </div>):(
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
        <Button mt={5} onClick={(e)=>setForgetPass(true)}>Forget Password</Button>
        <button className='loginRegisterButton'><Link className='link' to={'/register'}>Register</Link></button>
    </div>)
}
    </>
  )
}
