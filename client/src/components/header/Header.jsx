import React from 'react'
import './header.css'

import { Box, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from "../../assets/img1.jpg"
import img2 from "../../assets/img2.jpg"
import img3 from "../../assets/img3.jpg"
import img4 from "../../assets/img4.jpg"
import img5 from "../../assets/img5.jpg"
import img6 from "../../assets/img6.jpg"
import img7 from "../../assets/img7.jpg"
import img8 from "../../assets/img8.jpg"

const headingOptions = {
  pos: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  textTransform: 'uppercase',
  p: '4',
  size: '4xl',
};

export default function Header() {
  return (
    // <div className="header">
    //     <div className="headerTitles">
    //         <div className="headerTitleSm">IITI</div>
    //         <div className="headerTitleLg">Blogs</div>
    //     </div>
    //     <img className='headerImg' src={img1} alt="" />
    // </div>
    <Carousel
    autoPlay
    infiniteLoop
    interval={3000}
    showStatus={false}
    showThumbs={false}
    showArrows={false}
    
  >
    <Box w={'full'} h={'60vh'}>
      <Image src={img6} h="full" w={'full'} objectFit={'cover'} filter={'brightness(70%)'} />
      <Heading bgColor={'blackAlpha.600'} color={'wheat'} {...headingOptions}>
        IITI BLOGS
      </Heading>
    </Box>
    <Box w="full" h={'60vh'}>
      <Image src={img3} h="full" w={'full'} objectFit={'cover'} filter={'brightness(70%)'} />
      <Heading bgColor={'blackAlpha.600'} color={'wheat'} {...headingOptions}>
        PLACEMENTS
      </Heading>
    </Box>
    <Box w="full" h={'60vh'}>
      <Image src={img4} h="full" w={'full'} objectFit={'cover'} filter={'brightness(70%)'} />
      <Heading bgColor={'blackAlpha.600'} color={'wheat'} {...headingOptions}>
        ACADEMICS
      </Heading>
    </Box>
    <Box w="full" h={'60vh'}>
      <Image src={img5} h="full" w={'full'} objectFit={'cover'} filter={'brightness(70%)'} />
      <Heading bgColor={'blackAlpha.600'} color={'wheat'} {...headingOptions}>
        FUN ACTIVITY
      </Heading>
    </Box>
    <Box w="full" h={'60vh'}>
      <Image src={img8} h="full" w={'full'} objectFit={'cover'} filter={'brightness(70%)'} />
      <Heading bgColor={'blackAlpha.600'} color={'wheat'} {...headingOptions}>
        HEALTH
      </Heading>
    </Box>
  </Carousel>
  )
}
