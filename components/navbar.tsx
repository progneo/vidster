'use client'

import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import {
    FiHome,
    FiSearch,
    FiDollarSign,
    FiInfo,
    FiMenu,
    FiChevronDown,
} from 'react-icons/fi'
import {IconType} from 'react-icons'
import React from "react";
import NextLink from "next/link";
import {SearchIcon} from "@chakra-ui/icons";
import {NextRouter} from "next/router";

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
    {name: 'Home', icon: FiHome, href: '/'},
    {name: 'Search', icon: FiSearch, href: '/search'},
    {name: 'Customer', icon: FiDollarSign, href: '/customer'},
    {name: 'About', icon: FiInfo, href: '/about'},
]

const SidebarContent = ({path, onClose, ...rest}: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('#1F1D2B', '#1F1D2B')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <NextLink href={'/'}>
                    <Text fontSize="2xl" fontWeight="semibold">
                        Vidster
                    </Text>
                </NextLink>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} href={link.href} path={path}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}

const NavItem = ({icon, href, children, path, ...rest}: NavItemProps) => {
    const active = path === href
    const iconColor = active ? '#ff7350' : 'white'

    return (
        <NextLink href={href}>
            <Box
                style={{textDecoration: 'none'}}
                _focus={{boxShadow: 'none'}}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: '#353340',
                        color: 'white',
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            color={iconColor}
                            _groupHover={{
                                color: iconColor,
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

const MobileNav = ({onOpen, ...rest}: MobileProps) => {
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('#1F1D2B', '#1F1D2B')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            gap={3}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />
            <InputGroup>
                <Input variant='filled' placeholder='Search'/>
                <InputRightElement> <SearchIcon color='#5a5a68'/> </InputRightElement>
            </InputGroup>

            <Flex minWidth={'max-content'} alignItems={'center'}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Egor Sobolevskiy</Text>
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('#1F1D2B', '#1F1D2B')}
                            borderColor={useColorModeValue('#1F1D2B', '#1F1D2B')}>
                            <MenuItem bg={useColorModeValue('#1F1D2B', '#1F1D2B')}>Profile</MenuItem>
                            <MenuItem bg={useColorModeValue('#1F1D2B', '#1F1D2B')}>Settings</MenuItem>
                            <MenuDivider/>
                            <MenuItem bg={useColorModeValue('#1F1D2B', '#1F1D2B')}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Flex>
    )
}

const SidebarWithHeader = ({path, children}: ContentProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <Box minH="100vh" bg={useColorModeValue('#1F1D2B', '#1F1D2B')}>
            <SidebarContent path={path} onClose={() => onClose} display={{base: 'none', md: 'block'}}/>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent path={path} onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                {children}
            </Box>
        </Box>
    )
}

export default SidebarWithHeader