'use client'

import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack
} from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import NextLink from 'next/link'
import React from 'react'

interface UserAccountNavInterface {
  avatar: string
  name: string
  role: string
}

const UserAccountNav = ({ avatar, name, role }: UserAccountNavInterface) => {
  return (
    <Menu>
      <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
        <HStack>
          <Avatar size={'sm'} src={avatar} />
          <VStack
            display={{ base: 'none', md: 'flex' }}
            alignItems="flex-start"
            spacing="1px"
            ml="2"
          >
            <Text fontSize="sm">{name}</Text>
          </VStack>
          <Box display={{ base: 'none', md: 'flex' }}>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      {role === 'creator' && (
        <MenuList bg={'#1F1D2B'} borderColor={'#1F1D2B'}>
          <NextLink href={'/profile'}>
            <MenuItem bg={'#1F1D2B'}>Профиль</MenuItem>
          </NextLink>
          <MenuDivider />
          <NextLink href={'/logout'}>
            <MenuItem bg={'#1F1D2B'}>Выход</MenuItem>
          </NextLink>
        </MenuList>
      )}
      {role !== 'creator' && (
        <MenuList bg={'#1F1D2B'} borderColor={'#1F1D2B'}>
          <NextLink href={'/logout'}>
            <MenuItem bg={'#1F1D2B'}>Выход</MenuItem>
          </NextLink>
        </MenuList>
      )}
    </Menu>
  )
}

export default UserAccountNav
