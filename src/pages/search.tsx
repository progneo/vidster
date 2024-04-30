import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  CircularProgress,
  CloseButton,
  Collapse,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  RadioGroup,
  Stack,
  Radio,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import CreatorCard from '@/src/components/creatorCard'
import { getCreators } from '@/src/lib/creators'
import { getTags } from '@/src/lib/tags'
import Creator from '@/src/types/Creator'
import { NextRouter, useRouter } from 'next/router'
import Tag from '@/src/types/Tag'
import { useSearchParams } from 'next/navigation'

interface PanelProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  onSearch: ({
    name,
    sortBy,
    tags
  }: {
    name: string
    sortBy: string
    tags: string[]
  }) => void
}

const SidebarContent = ({ onClose, onSearch, ...rest }: SidebarProps) => {
  const [isLoading, setLoading] = useState<Boolean>(true)

  const [tags, setTags] = useState(new Set<string>())
  const [checkedTags, setCheckedTags] = useState(new Set<string>())

  const [sortBy, setSorting] = React.useState('name')

  const [name, setName] = React.useState('')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  useEffect(() => {
    getTags().then(data => {
      setTags(data.map((t: Tag) => t.name))
      setLoading(false)
    })
  }, [])

  const updateQuery = async () => {
    onSearch({
      name: name,
      sortBy: sortBy,
      tags: Array.from(checkedTags)
    })
  }

  if (isLoading) {
    return (
      <Flex justify={'center'}>
        <CircularProgress
          isIndeterminate
          size="100px"
          thickness="4px"
          color="#cc5d40"
        />
      </Flex>
    )
  }

  return (
    <Box
      transition="3s ease"
      bg={'#1F1D2B'}
      w={{ base: 'full', md: 60 }}
      pos="absolute"
      h={{ base: 'full', md: 'auto' }}
      p={{ base: 5, md: 0 }}
      {...rest}
    >
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Text fontSize="xl" fontWeight="semibold">
          Фильтры
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack spacing={3} alignItems={'start'} width="100%">
        <VStack spacing={1} alignItems={'start'} width="100%">
          <Text>Название</Text>
          <InputGroup>
            <Input
              value={name}
              onChange={handleNameChange}
              variant="filled"
              placeholder={'Название'}
            />
          </InputGroup>
        </VStack>
        <VStack alignItems={'start'} width="100%">
          <Text>Сортировка</Text>
          <Box
            px={3}
            py={2}
            backgroundColor={'#282633'}
            width="100%"
            borderRadius="md"
          >
            <RadioGroup value={sortBy} onChange={setSorting}>
              <Stack spacing={1} direction="column">
                <Radio colorScheme={'orange'} value="name">
                  По названию
                </Radio>
                <Radio colorScheme="green" value="rating">
                  По рейтингу
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
        <CategoryBlock
          title={'Тэги'}
          items={Array.from(tags)}
          checkedItems={checkedTags}
          setCheckedItems={setCheckedTags}
        />
        <Button
          bg={'#cc5d40'}
          _hover={{
            bg: '#994530',
            color: 'white'
          }}
          onClick={updateQuery}
        >
          Применить
        </Button>
      </VStack>
    </Box>
  )
}

const Panel = ({ onOpen, ...rest }: PanelProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      alignItems="center"
      bg={'#1F1D2B'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      gap={3}
      {...rest}
    >
      <Button
        display={{ base: 'flex', md: 'none' }}
        rightIcon={<FiFilter />}
        colorScheme="white"
        variant="ghost"
        onClick={onOpen}
      >
        Фильтры
      </Button>
    </Flex>
  )
}

function CategoryBlock({
  title,
  items,
  checkedItems,
  setCheckedItems
}: {
  title: string
  items: string[]
  checkedItems: Set<string>
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<string>>>
}) {
  const { isOpen, onToggle } = useDisclosure()

  const handleCheckboxChange = (itemTitle: string) => {
    setCheckedItems(prev => {
      const newChecked = new Set(prev)
      if (newChecked.has(itemTitle)) {
        newChecked.delete(itemTitle)
      } else {
        newChecked.add(itemTitle)
      }
      return newChecked
    })
  }

  return (
    <Box width="100%">
      <HStack onClick={onToggle} mb={2}>
        <Text fontWeight={500}>{title}</Text>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <Box
          px={3}
          py={2}
          backgroundColor={'#282633'}
          width="100%"
          borderRadius="md"
        >
          <VStack alignItems={'start'}>
            {items.map((item, i) => (
              <Checkbox
                key={i}
                colorScheme="red"
                isChecked={checkedItems.has(item)}
                onChange={() => handleCheckboxChange(item)}
              >
                {item}
              </Checkbox>
            ))}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  )
}

function CreatorsBlock({
  data,
  isLoading
}: {
  data: Creator[]
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <Flex justify={'center'}>
        <CircularProgress
          isIndeterminate
          size="100px"
          thickness="4px"
          color="#cc5d40"
        />
      </Flex>
    )
  }

  if (data !== undefined) {
    return (
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', '2xl': 'repeat(3, 1fr)' }}
        gap={4}
      >
        {data.map((creator: Creator, i) => {
          return (
            <GridItem key={i} colSpan={{ base: 2, xl: 1 }}>
              <CreatorCard creator={creator} />
            </GridItem>
          )
        })}
      </Grid>
    )
  } else {
    return <Text textAlign={'center'}>Ничего не найдено.</Text>
  }
}

function SearchPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState<Array<Creator>>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  const updateCreators = () => {
    setLoading(true)
    getCreators().then(data => {
      setData(data.items)
      setLoading(false)
    })
  }

  const searchCreators = ({
    name,
    sortBy,
    tags
  }: {
    name: string
    sortBy: string
    tags: string[]
  }) => {
    setLoading(true)
    getCreators(name, sortBy, tags).then(data => {
      setData(data.items)
      setLoading(false)
    })
  }

  useEffect(() => {
    updateCreators()
  }, [])

  return (
    <Box>
      <HStack>
        <Heading noOfLines={2} as="h4" mb={{ base: '2', md: '5' }}>
          Список видеографов
        </Heading>
        <Panel onOpen={onOpen} />
      </HStack>
      <SidebarContent
        onClose={onClose}
        onSearch={searchCreators}
        display={{ base: 'none', md: 'block' }}
      />
      <Box>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} onSearch={searchCreators} />
          </DrawerContent>
        </Drawer>
      </Box>
      <Box ml={{ base: 0, md: 60 }} p={4}>
        <CreatorsBlock data={data} isLoading={isLoading} />
      </Box>
    </Box>
  )
}

export default SearchPage
