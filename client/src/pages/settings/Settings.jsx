import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Loader from '../../components/Loader/Loader'
import { Context } from '../../context/Context'
import './settings.css'

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/";
    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const updatedUser = {
          userId: user._id,
          username,email,password,
        };
        setLoading(true);
        if(file){
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = async () => {
            const res = await axios.post('/api/uploadimg', {
              data: reader.result,
            });
            updatedUser.profilePic = res.data.url;
           // console.log(updatedUser);
            try{
              const res = await axios.put("/api/users/"+user._id, updatedUser);
              setSuccess(true);
              dispatch({type:"UPDATE_SUCCESS", payload:res.data});
               //console.log(res);
               setLoading(false);
            }
            catch(err){

            }
          };
          reader.onerror = () => {
              console.error('AHHHHHHHH!!');
          };
      
        }
        else{
          try{
            const res = await axios.put("/api/users/"+user._id, updatedUser);
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS", payload:res.data});
        }
          catch(err){
            setError(true);
            dispatch({type:"UPDATE_FAILURE"});
          }
        }
      }
  return (<>
    {loading?(<Loader/>):(
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update your Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file):user.profilePic} alt="" />
                    <label htmlFor="fileInput"><i className="settingsPPIcon fa-solid fa-user"></i></label>
                    <input type="file" id='fileInput' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)} />
                <label>Email</label>
                <input type="text" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className='settingsSubmit' type='submit'>Update</button>
                {success && <span style={{color:'green',textAlign:"center"}}>Profile has been updated...</span>}
                {error?<span style={{display:'flex', alignItems:'center', justifyContent:'center', color:"red", marginTop:"10px", paddingLeft:"20px"}}>Something went wrong <br/> Username is required and should be unique <br/> E-mail is required and should be unique</span>:<></>}
            </form>
        </div>
    </div>
    )
    }
    </>
  )
}
