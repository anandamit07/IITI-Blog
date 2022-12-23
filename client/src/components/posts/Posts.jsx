import React from 'react'
import Post from '../post/Post'
import './posts.css'
import { HStack } from '@chakra-ui/react'
export default function Posts({posts}) {

  return (
    <div className='posts'>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {posts.map((p) => (
              <Post post={p} key={p._id}/>
            ))}
          </HStack>
        {/* {
          posts.map((p)=>{
            return <Post post={p} key={p._id}/>
          })
        } */}
    </div>
  )
}
