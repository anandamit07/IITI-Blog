import { Button, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css'

export default function Sidebar() {
    const [cats, setCats] = useState([]);
    const [subcats, setSubcats] = useState(null);
    const location = useLocation();
    useEffect(()=>{
        setSubcats(null);
        const getCats = async ()=>{
            const res = await axios.get("/api/categories");
            setCats(res.data);
        }
        const getSubCats = async() =>{
          const query = new URLSearchParams(location.search);
          const cat = query.get('cat');
          if(cat){
            const scats= await axios.get(`/api/categories/?name=${cat}`);
            setSubcats(scats.data[0].subcategories.sort());
          }
        }
        getCats();
        getSubCats();
    },[location]);

  return (
    <div className="sidebar">
        {/* <div className="sidebarItem">
            <span className='sidebarTitle'>ABOUT ME</span>
            <img className='sidebarImg' src='https://images.pexels.com/photos/2227959/pexels-photo-2227959.jpeg?auto=compress&cs=tinysrgb&w=600'/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum pariatur labore ratione ad, laborum fuga distinctio corrupti soluta facere ut ipsam.</p>
        </div> */}
        
        {/* <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {
                    cats.map((c)=>(
                        <Link to={`/?cat=${c.name}`} className='link'>
                        <li className='sidebarListItem'>{c.name}</li>
                        </Link>
                    ))
                }
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-square-facebook fa-lg"></i>
            <i className="sidebarIcon fa-brands fa-square-twitter fa-lg"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram fa-lg"></i>
            <i className="sidebarIcon fa-brands fa-linkedin fa-lg"></i>
            </div>
        </div> */}
        <VStack alignItems={'flex-start'}>

              <Button
                variant={'solid'}
                colorScheme='red'
              >
                <Link to={'/'}>ALL CATEGORIES</Link>
              </Button>
            
                {
                    cats.map((c)=>(
                        <Button
                variant={'ghost'}
                colorScheme={'purple'} marginTop={'10px'}
                _active={{
                  bg: '#FF4545',
                  transform: 'scale(0.98)',
                  borderColor: '#bec3c9',
                }}
              >
                <Link to={`/?cat=${c.name}`} style={{color:'wheat'}}>{c.name.toUpperCase()}</Link>
              </Button>
                    ))
                }
        </VStack>
        {
          subcats?<VStack alignItems={'flex-start'} mt={10} maxH={'70vh'} overflowY={'auto'} className='subcats'>
            <Button
                variant={'solid'}
                colorScheme='teal'
              >
                SUB-CATEGORIES
              </Button>
              {
                    subcats.map((c)=>(
                        <Button
                variant={'ghost'}
                colorScheme={'teal'} marginTop={'10px'}
                value={c}
                _active={{
                  bg: '#FF4545',
                  transform: 'scale(0.98)',
                  borderColor: '#bec3c9',
                }}
              >
                <Link to={`/${location.search.split("&", 1).join("&")}&subcat=${c}`} >{c.toUpperCase()}</Link>
              </Button>
                    ))
                }
          </VStack>:<></>
        }
    </div>
  )
}
