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
import { signOut } from 'next-auth/react'
import React from 'react'
import { redirect } from 'next/navigation'

interface UserAccountNavInterface {
  avatar: string
  name: string
}

const UserAccountNav = ({ avatar, name }: UserAccountNavInterface) => {
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
      <MenuList bg={'#1F1D2B'} borderColor={'#1F1D2B'}>
        <NextLink href={'/profile/0'}>
          <MenuItem bg={'#1F1D2B'}>Профиль</MenuItem>
        </NextLink>
        <MenuItem bg={'#1F1D2B'}>Настройки</MenuItem>
        <MenuDivider />
        <MenuItem bg={'#1F1D2B'} onClick={() => signOut()}>
          Выход
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserAccountNav
