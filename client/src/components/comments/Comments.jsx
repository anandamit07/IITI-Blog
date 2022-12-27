import { Heading, HStack, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Context } from '../../context/Context';
import './comments.css'
export default function Comments({post}) {
    const [comms, setComms] = useState([]);
    const [ref, setRef] = useState(false);
    const {user} = useContext(Context);
    useEffect(()=>{
        const getComm = async() =>{
            const postId = post._id;
            const res = await axios.get(`/api/comments/?id=${postId}`);
            setComms(res.data);
        }
        getComm();
    },[ref]);
    const handleDelete = async(e) =>{
        const commId = e.target.id;
        const res = await axios.delete(`/api/comments/${commId}`);
        setRef(!ref);
    }
  return (<>
    <Heading size={'lg'} color={'wheat'} marginTop={8}>Comments</Heading>
    <div className='comments'>
        {
            comms.map((c)=>(
                <HStack key={c._id} className='comment'>
                    <i className="fa-solid fa-comment"></i>
                    <Heading size={'20px'} color={'black'}> {c.user}:</Heading>
                    <Text size={'sm'} color={'whiteAlpha.700'} w={'70%'}>{c.desc}</Text>
                    {
                        user && (user.username === c.user)?<i style={{cursor:'pointer'}} id={c._id} className="fa-solid fa-trash" onClick={handleDelete}></i>:<></>
                    }
                </HStack>
            ))
        }
    </div>
    </>
  )
}
