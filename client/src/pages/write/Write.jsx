import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react'
import { Context } from '../../context/Context';
import './write.css'
import Loader from '../../components/Loader/Loader';
import { color, Container, Select } from '@chakra-ui/react';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [cats, setCats] = useState([]);
  const [subcats, setSubcats] = useState(null);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const {user} = useContext(Context);
  useEffect(()=>{
    const fetchCats = async()=>{
      const res = await axios.get("/api/categories");
      setCats(res.data);
    }
    fetchCats();
  },[])
  const handleCategoryChange = async (e)=>{
    if(e.target.value === ""){
      setCategory(null);
      setSubcats(null);
    }
    else{
      const catId = e.target.value;
      const res = await axios.get(`/api/categories/?id=${catId}`);
      setCategory(res.data);
      setSubcats(res.data.subcategories.sort());
    }
  }
  const handleSubCategoryChange = async (e)=>{
    if(e.target.value === ""){
      setSubcategory(null);
    }
    else{
      setSubcategory(e.target.value);
    }
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    if(category){
      categories.push(category.name);
      if(subcategory){
        subcategories.push(subcategory);
      }
    }
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
      subcategories,
    };

    if(file){
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
            <span style={{display:'flex',alignItem:'center',justifyContent:'center', color:'wheat',fontSize:'20px'}}>ADD CATEGORIES</span>
            
            <div className="writeFormCategory">
              <Select mx={10} my={5} onChange={handleCategoryChange} w={'15vw'}>
                <option value="" style={{backgroundColor:'#666',color:'whitesmoke'}}>ALL CATEGORIES</option>
                {cats.map((category) => (
                  <option key={category._id} value={category._id} style={{backgroundColor:'#666',color:'whitesmoke'}}>{category.name.toUpperCase()}</option>
                ))}
              </Select>
              {category && (
                <Select mx={10} my={5} w={'15vw'} onChange={handleSubCategoryChange}>
                <option value="" style={{backgroundColor:'#666',color:'whitesmoke'}}>SUB-CATEGORIES</option>
                {subcats.map((category) => (
                  <option value={category} style={{backgroundColor:'#666',color:'whitesmoke'}}>{category.toUpperCase()}</option>
                ))}
              </Select>)
              }
            </div>
            <button className='writeSubmit' onClick={handleSubmit}>Publish</button>
        </form>
    </div>
    )
      }
      </>
  )
}
