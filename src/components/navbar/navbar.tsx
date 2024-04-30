import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { FiHome, FiDollarSign, FiInfo, FiMenu, FiLogIn } from 'react-icons/fi'
import { IconType } from 'react-icons'
import React from 'react'
import NextLink from 'next/link'
import { SearchIcon } from '@chakra-ui/icons'
import UserAccountNav from '@/src/components/navbar/userAccountNav'
import { useAppSelector } from '@/src/store/store'

interface LinkItemProps {
  name: string
  icon: IconType
  href: string
}

interface NavItemProps extends FlexProps {
  icon: IconType
  href: string
  path: string
  children: React.ReactNode
}

interface ContentProps extends FlexProps {
  path: string
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  path: string
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Домой', icon: FiHome, href: '/' },
  { name: 'Заказчику', icon: FiDollarSign, href: '/search' },
  { name: 'О нас', icon: FiInfo, href: '/about' }
]

const SidebarContent = ({ path, onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={'#1F1D2B'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <NextLink href={'/'}>
          <Text fontSize="2xl" fontWeight="semibold">
            Vidster
          </Text>
        </NextLink>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} href={link.href} path={path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, href, children, path, ...rest }: NavItemProps) => {
  const active = path === href
  const iconColor = active ? '#ff7350' : 'white'

  return (
    <NextLink href={href}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          fontWeight={'bold'}
          _hover={{
            bg: '#353340',
            color: 'white'
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="20"
              color={iconColor}
              _groupHover={{
                color: iconColor
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </NextLink>
  )
}

const LoginButton = () => {
  return (
    <NextLink href={'/signin'}>
      <HStack>
        <FiLogIn />
        <Text fontSize="sm">Login</Text>
      </HStack>
    </NextLink>
  )
}

const UserPanel = () => {
  const authState = useAppSelector(state => state.auth)

  if (authState.isAuthorized) {
    return (
      <UserAccountNav
        avatar={authState.avatar}
        name={authState.firstName}
        role={authState.role}
      />
    )
  } else {
    return <LoginButton />
  }
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={'#1F1D2B'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      gap={3}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex minWidth={'max-content'} alignItems={'center'}>
        <Flex alignItems={'center'}>
          <UserPanel />
        </Flex>
      </Flex>
    </Flex>
  )
}

const SidebarWithHeader = ({ path, children }: ContentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={'#1F1D2B'}>
      <SidebarContent
        path={path}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent path={path} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader
