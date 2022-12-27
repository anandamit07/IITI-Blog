import { Button, HStack, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context';
import Comments from '../comments/Comments';
import './singlePost.css'

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState([]);
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [liked, setLiked] = useState(false);
    const [seed, setSeed] = useState(false);
    const [usersLiked, setUsersLiked] = useState([]);
    const [comm, setComm] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const PF = "http://localhost:5000/images/";

    useEffect(()=>{
        const getPost = async() =>{
            const res = await axios.get("/api/posts/"+path)
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setUsersLiked(res.data.liked);
            if(user){
                setLiked(res.data.liked.includes(user.username));
            }
            setSeed(!seed);
        }

        getPost();
    },[path,liked]);
    const handleDelete = async() =>{
        await axios.delete("/api/posts/" + path,{data:
            {username:user.username},
        });
        window.location.replace("/");
    }
    const handleUpdate = async() =>{
        try{
            await axios.put(`/api/posts/${post._id}`,{
                username:user.username,
                title,
                desc,
            })
            setUpdateMode(false);
        }
        catch(err){

        }
    }
    const handleLike = async() =>{        
        try{
            await axios.put(`/api/posts/like/${post._id}`,{
                username:user.username,
            });
            setLiked(!liked);
        }
        catch(err){

        }
    }
    const handleComm = async() =>{
        if(!user){
            window.location.replace("/login");
        }
        try{
            await axios.post('/api/comments',{
                postId: post._id,
                user:user.username,
                desc: comm,    
            });
            setComm("");
            setSeed(!seed);
        }catch(err){
            
        }
    }
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            {
                post.photo?<img className='singlePostImg' src={post.photo} alt="" />:
                <img className='singlePostImg' src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            }
            {
                updateMode? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/>:(
                    <h1 className="singlePostTitle">
                {title}
                {
                post.username === user?.username && (<div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                </div>)
                }
            </h1>
                )
            }
            <div className="singlePostInfo">
                <span className='singlePostAuthor'>Author: <Link to={`/?user=${post.username}`} className='link'><b>{post.username}</b></Link></span>
                <span>{`Likes: ${usersLiked.length}`} <i className="fa-solid fa-heart" style={{color:'#FF4545'}}/></span>
                <span className='singlePostDate'>{new Date(post.createdAt).toDateString().substring(4)}</span>
            </div>
            {
                updateMode?<textarea className='singlePostDescriptionInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                :<div style={{ whiteSpace: 'pre-wrap' }} className='singlePostDesc'>{desc}</div>
            }
            {
                updateMode?
                <button className='singlePostButton' onClick={handleUpdate}>Update</button>
                :<></>
            }
            {
                !updateMode?
                <button className={`like-button${liked ? ' liked' : ''}`} onClick={handleLike}>
                <i className="fa-solid fa-heart" style={{color:'#FF4545'}}></i> Like
              </button>:<></>
            }
            <div className='commentsGroup'>
                
                <HStack>
                    <textarea className='commentInput' value={comm} onChange={(e)=>setComm(e.target.value)}/>
                    <Button onClick={handleComm}>Comment</Button>
                </HStack>
                <Comments post={post} key={seed}/>
            </div>
            
            </div>
    </div>
  )
}
