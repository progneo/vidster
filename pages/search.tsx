import {
    Box,
    BoxProps, Button, Checkbox,
    CloseButton, Collapse,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps, Grid, GridItem,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure, VStack
} from "@chakra-ui/react"
import React from "react"
import {FiFilter, FiTrendingUp} from "react-icons/fi"
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import creatorsMock from "@/mock/creatorsMock";
import Creator from "@/data/Creator";
import CreatorCard from "@/components/creatorCard";

interface FilterItem {
    title: string
    isChecked: boolean
}

interface FilterCategory {
    title: string
    items: Array<FilterItem>
}


interface CategoryProps extends BoxProps {
    category: FilterCategory
}

interface OverlayProps extends FlexProps {
    children: React.ReactNode
}

interface PanelProps extends FlexProps {
    onOpen: () => void
}

interface SidebarProps extends BoxProps {
    onClose: () => void
}

const CategoryBlock = ({category}: CategoryProps) => {
    const {isOpen, onToggle} = useDisclosure()
    return (
        <Box>
            <HStack onClick={onToggle}>
                <Text my={2} fontWeight={500}>{category.title}</Text>
                {isOpen ? <ChevronUpIcon/> : <ChevronDownIcon/>}
            </HStack>
            <Collapse in={isOpen} animateOpacity>
                <VStack alignItems={"start"}>
                    {category.items.map((item, i) => (
                        <Checkbox key={i} colorScheme='red'>
                            {item.title}
                        </Checkbox>
                    ))}
                </VStack>
            </Collapse>
        </Box>
    )
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    const FilterCategories: Array<FilterCategory> = [
        {
            title: 'Category',
            items: [
                {
                    title: 'Category 1',
                    isChecked: false
                },
                {
                    title: 'Category 2',
                    isChecked: false
                },
                {
                    title: 'Category 3',
                    isChecked: false
                },
            ],
        },
        {
            title: 'Category',
            items: [
                {
                    title: 'Category 1',
                    isChecked: false
                },
                {
                    title: 'Category 2',
                    isChecked: false
                },
                {
                    title: 'Category 3',
                    isChecked: false
                },
            ],
        },
        {
            title: 'Category',
            items: [
                {
                    title: 'Category 1',
                    isChecked: false
                },
                {
                    title: 'Category 2',
                    isChecked: false
                },
                {
                    title: 'Category 3',
                    isChecked: false
                },
            ],
        },
    ]
    return (
        <Box
            transition="3s ease"
            bg={'#1F1D2B'}
            w={{base: 'full', md: 40}}
            pos="absolute"
            h={{base: 'full', md: 'auto'}}
            p={{base: 5, md: 0}}
            {...rest}>
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
                <Text fontSize="xl" fontWeight="semibold">
                    Filters
                </Text>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
            {FilterCategories.map((category, i) => (
                <CategoryBlock key={i} category={category}/>
            ))}
            <Button
                mt={3}
                bg={'#cc5d40'}
                _hover={{
                    bg: '#994530',
                    color: 'white',
                }}>
                Apply
            </Button>
        </Box>
    )
}

const Panel = ({onOpen, ...rest}: PanelProps) => {
    return (
        <Flex
            ml={{base: 0, md: 60}}
            alignItems="center"
            bg={'#1F1D2B'}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            gap={3}
            {...rest}>
            <Button
                display={{base: 'flex', md: 'none'}}
                rightIcon={<FiFilter/>}
                colorScheme='white'
                variant='ghost'
                onClick={onOpen}>
                Filters
            </Button>

            <Flex minWidth={'max-content'} alignItems={'center'}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{boxShadow: 'none'}}>
                            <HStack color={'#ff7551'}>
                                <FiTrendingUp/>
                                <Text fontSize="sm">Sort by</Text>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={'#1F1D2B'}
                            borderColor={'#1F1D2B'}>
                            <MenuItem bg={'#1F1D2B'}>By this</MenuItem>
                            <MenuItem bg={'#1F1D2B'}>By this</MenuItem>
                            <MenuItem bg={'#1F1D2B'}>By this</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Flex>
    )
}

function OverlayBlock({children}: OverlayProps) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <Box>
            <Heading noOfLines={1} as='h4' mb={{base: '2', md: '5'}}>Creator list</Heading>
            <SidebarContent onClose={() => onClose} display={{base: 'none', md: 'block'}}/>
            <Box>
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full">
                    <DrawerContent>
                        <SidebarContent onClose={onClose}/>
                    </DrawerContent>
                </Drawer>
            </Box>
            <Panel onOpen={onOpen}/>
            <Box ml={{base: 0, md: 40}} p={4}>
                {children}
            </Box>
        </Box>
    )
}

function SearchCard() {
    return (
        <OverlayBlock>
            <Grid templateColumns={{base: 'repeat(2, 1fr)', '2xl': 'repeat(3, 1fr)'}} gap={4}>
                {creatorsMock.map((creator: Creator, i) => {
                    return <GridItem key={i} colSpan={{base: 2, xl: 1}}>
                        <CreatorCard creator={creator}/>
                    </GridItem>
                })}
            </Grid>
        </OverlayBlock>
    )
}

export default SearchCard