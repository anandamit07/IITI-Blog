import { Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import './about.css'
import img1 from '../../assets/amit2.png'
import logo from '../../assets/logo.png'
export default function About() {
  return (
    <Container className='about' maxW={'full'} p={'10'}>
        <VStack
          alignItems={'center'}
          spacing={'8'}
          w={'full'}
          m={'auto'}
        >
            <Heading className='aboutHeading' size='2xl'>ABOUT</Heading>
            <Heading style={{color:'wheat'}} size='md'>"Every Story is worth sharing for...."</Heading>
            <HStack 
            m={'auto'}
          mx={'16'} spacing={8} justify={'center'}>
                <Image src={img1} boxSize='300px' objectFit='cover' borderRadius='full' m='20px'></Image>
                    <Text w={'60vw'} fontSize='xl'><b style={{color:'wheat'}}>Creating a community for impact:</b><br/><br/>Everyone has a story to tell, a lesson to teach, and wisdom to share...<br/>
            Life is a masterpiece bound together by your experiences. Open up and share your story,
            become an inspiration to others. You can make a difference because you matter.You were created 
            with purpose. Live your life with intention, go out there and make difference by being difference.</Text>
            </HStack>
            <HStack w={'75vw'}>
              <Text w={'70vw'} fontSize={'xl'}>
              <b>W</b>elcome to our website, where people can share their experiences, stories, and ideas in the form of blog posts. We are excited to provide a platform where people can connect with others and share their thoughts and insights on a wide range of topics.

<br/><br/>We are committed to creating a welcoming and inclusive community where everyone feels comfortable sharing their stories and ideas. We encourage respectful and constructive dialogue and aim to create a space where people can learn from each other and grow together.

<br/><br/>Thank you for choosing to be a part of our community. We hope that you will find the content on our website informative, inspiring, and thought-provoking. If you have any questions, suggestions, or feedback, please don't hesitate to contact us.

<br/><br/>We look forward to reading your stories and ideas!
              </Text>
              <Image src={logo}></Image>
            </HStack>
        </VStack>
    </Container>
  )
}
