import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react'
import { Context } from '../../context/Context';
import './write.css'
import Loader from '../../components/Loader/Loader';
import { Container } from '@chakra-ui/react';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cats, setCats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(Context);
  useEffect(()=>{
    const fetchCats = async()=>{
      const res = await axios.get("/api/categories");
      setCats(res.data);
    }
    fetchCats();
  },[])
  const handleChange = (e)=>{
    if(!categories.includes(e.target.id)){
      categories.push(e.target.id);
    }
    else{
      categories.splice(categories.indexOf(e.target.id),1);
    }
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };
    if(file){

      
      // Create a FormData object to send the image to the server
      // Create a FormData object to send the image to the server
      // const data = new FormData();
      // data.append('file', file);

      // Send a POST request to the server with the image data
      // axios.post('/api/uploadimg', data).then((response) => {
      //   console.log(response.data.url);
      // }).catch((error) => {
      //   console.error(error);
      // });
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const res = await axios.post('/api/uploadimg', {
          data: reader.result,
        });
        newPost.photo = res.data.url;
        console.log(newPost);
        try{
          const res = await axios.post("/api/posts", newPost);
          window.location.replace("/post/" + res.data._id);
          console.log(res);
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
      const res = await axios.post("/api/posts", newPost);
      setLoading(false);
      window.location.replace("/post/" + res.data._id);
    }
    
  }
  return (
  <>
    {loading?(<Loader/>):(
    <div className="write">
        {
          file && (
          <img className='writeImg' src={URL.createObjectURL(file)} alt="" />
        )}
        <form action="" className="writeForm">
            <div className="writeFormGroup">
                <label htmlFor="fileInput"><i className="writeIcon fa-solid fa-plus"></i></label>
                <input type="file" id='fileInput' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                <input type="text" placeholder="Title" className='writeInput' autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Tell your Story....' type="text" className='writeInput writeText' onChange={(e)=>setDesc(e.target.value)}></textarea>
            </div>
            <span style={{display:'flex',alignItem:'center',justifyContent:'center', color:'wheat',fontSize:'20px'}}>Categories</span>
            <div className="writeFormCategory">
      {cats.map((c) => (<>
        <input
          type="checkbox"
          id={c.name}
          key={c._id}
          onChange={handleChange}
        />
        <label className='writeCategoryLable' htmlFor={c.name}>{c.name}</label>
        </>
      ))}
    </div>
            <button className='writeSubmit' onClick={handleSubmit}>Publish</button>
        </form>
    </div>
    )
      }
      </>
  )
}
