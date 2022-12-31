import React from 'react'
import './post.css'
import {Link} from 'react-router-dom'
import { Heading, HStack, Image, StackDivider, Text, VStack } from '@chakra-ui/react';
export default function Post({post}) {
  const PF = "http://localhost:5000/images/";
  return (
    <div>
        {/* <img className='postImg' src={post.photo?PF+post.photo:"https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="" />  
        <div className="postInfo">
            <div className="postCats">
              {
                post.categories.map((c)=>(
                  <span className="postCat">{c}</span>
                ))
              }
            </div>
            <Link to={`/post/${post._id}`} className='link'>
              <span className="postTitle">{post.title}</span>
            </Link>
            <hr/>
            <span className="postDate">{new Date(post.createdAt).toDateString}</span>
        </div>
        <p className='postDesc'>
            {post.desc}
        </p> */}
        <Link to={`/post/${post._id}`}>
    <VStack className='card'
      w={'60'}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      spacing={'5px'}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={post.photo?post.photo:"https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        w={"50"}
        h={"40"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1} className='postTitle'>
        {(post.title).slice(0,20)}
      </Heading>

      <Text noOfLines={1} align={'center'}>
              {
                post.categories.map((c)=>(
                  <span className="postCat">{c.charAt(0).toUpperCase() + c.slice(1)}</span>
                ))
              }
              {
                post.subcategories.map((c)=>(
                  <span className='postCat'>{c.charAt(0).toUpperCase() + c.slice(1)}</span>
                ))
              }
      </Text>
      <HStack>
      <Text className='postDate' noOfLines={1}>{post.liked.length} <i class="fa-solid fa-heart" style={{color:'#FF4545'}}></i></Text>
      <Text className='postDate' noOfLines={1}>{new Date(post.createdAt).toDateString().substring(4)}</Text>
              </HStack>
      <Text className='postDesc' noOfLines={3}>{post.desc}</Text>
    </VStack>
  </Link>
    </div>
  )
}
