import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import axios from "axios";
import { useLocation } from 'react-router-dom'
import { Button, HStack } from '@chakra-ui/react'
import Pagination from '../../components/pagination/Pagination'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);
  const {search} = useLocation();
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get(`api/posts${search}`);
      setPosts(res.data);
    }
    fetchPosts();
  },[search]);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  return (
    <div style={{backgroundColor:'#1E1C1C'}}>
    <Header/>
        
        <div className='home'>
            <Sidebar/>
            <Posts posts={currentPosts}/>
        </div>
        <Pagination totalPosts = {posts.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </div>
  )
}
