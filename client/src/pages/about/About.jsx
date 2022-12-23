import { Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import './about.css'
import img1 from '../../assets/amit2.png'
export default function About() {
  return (
    <Container className='about' maxW={'full'} h={'100vh'} p={'10'}>
        <VStack
          alignItems={'center'}
          spacing={'8'}
          w={'full'}
          m={'auto'}
          my={'16'}
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
        </VStack>
    </Container>
  )
}
