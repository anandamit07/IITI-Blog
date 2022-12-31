import { Button, Container, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import './contact.css'

export default function Contact() {
  return (
    <Container className='contact' maxW={'full'} h={'100vh'} p={'10'}>
        <VStack
        alignItems={'center'}
        spacing={'8'}
        w={'70vw'}
        m={'auto'}
        my={'16'}>
            <Heading color={'wheat'}>Contact Us</Heading>
            <HStack w={'full'} spacing='40px'>
            <VStack
            spacing={'8'}
            w={'full'}
            >
                    <HStack spacing='24px'>
                    <i class="fa-solid fa-envelope fa-lg"></i>

                    <Text><b>Email</b> : iitiblogs@gmail.com</Text>
                    </HStack>
                    <HStack spacing='24px'>
                    <i class="fa-solid fa-mobile fa-lg"></i>
                    <Text><b>Mobile No</b>: +91-9294961495</Text>
                    </HStack>
                    <HStack spacing='24px'>
                    <i class="fa-solid fa-location-dot fa-lg"></i>
                    <Text><b>Address</b>: 517E, APJ Hostel, IITI</Text>
                    </HStack>
                </VStack>
                <form action='https://formspree.io/f/xjvdvblw' method='POST' style={{width:'55vw'}}>
                <VStack 
                w={'full'}
                alignItems={'center'}
                m={'auto'}
        my={'16'}
                >
                <Input
                name='name'
            placeholder={'Name'}
            type={'text'}
            required
            focusBorderColor={'red.500'}
          />
                <Input
                name='email'
            placeholder={'Email'}
            type={'email'}
            required
            focusBorderColor={'red.500'}
          />
          <Input
            name='message'
            placeholder={'Comment'}
            type={'text'}
            required
            focusBorderColor={'red.500'}
            h={200}
            />
            <Button colorScheme={'red'} type={'submit'}>
            Send
          </Button>
          
                </VStack>
                </form>
            </HStack>
        </VStack>
    </Container>
  )
}
