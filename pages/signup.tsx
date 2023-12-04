'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Switch
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)

  return (
    <Flex justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={'#3a3651'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack spacing={4} justify={'center'}>
              <Text>I&apos;m creating</Text>
              <Switch
                id="isOrdering"
                colorScheme={'red'}
                onChange={() => setIsOrdering(isOrdering => !isOrdering)}
              />
              <Text>I&apos;m ordering</Text>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl
              id="organization"
              display={isOrdering ? 'block' : 'none'}
            >
              <FormLabel>Organization name</FormLabel>
              <Input type="organization" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                bg={'#ff7551'}
                color={'white'}
                _hover={{
                  bg: '#b25138'
                }}
              >
                Sign in
              </Button>
            </Stack>
            <HStack pt={6} justifyContent={'center'}>
              <Text align={'center'}> Already a user?</Text>
              <NextLink href={'signin'}>
                <Text color={'#ff7551'}>Login</Text>
              </NextLink>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignupCard