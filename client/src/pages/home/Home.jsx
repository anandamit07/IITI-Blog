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

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const {search} = useLocation();

  useEffect(()=>{
    const fetchPosts = async ()=>{
      if(search === ""){
        const res = await axios.get(`api/posts/?page=${page}`);
        setPosts(res.data);
      }else{
        const res = await axios.get(`api/posts${search}&page=${page}`);
        setPosts(res.data);
      }
    }
    fetchPosts();
  },[search, page]);
  const btns = new Array(10).fill(1);
  return (
    <div style={{backgroundColor:'#1E1C1C'}}>
    <Header/>
        
        <div className='home'>
            <Sidebar/>
            <Posts posts={posts}/>
        </div>
        <HStack w={'60vw'} p={"8"} marginLeft={'30vw'}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
    </div>
  )
}
