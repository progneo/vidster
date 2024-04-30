import { useAppSelector } from '@/src/store/store'
import React, { useEffect, useState } from 'react'
import Creator from '@/src/types/Creator'
import { getCreatorByUserId } from '@/src/lib/creators'
import CrateCreatorProfilePage from '@/src/components/CreateCreatorPanel'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import Rating from '@/src/components/rating'
import calculateAverageRating from '@/src/util/calculateAverageRating'
import { FiMapPin } from 'react-icons/fi'
import YoutubeEmbed from '@/src/components/youtubeEmbed'
import { BiPlus, BiTrash } from 'react-icons/bi'
import AddWorkModal from '@/src/components/modals/AddWork'
import { useRouter } from 'next/router'
import { EditIcon } from '@chakra-ui/icons'
import { removeWork } from '@/src/lib/works'
import EditProfileModal from '@/src/components/modals/EditProfile'

const ProfilePage = () => {
  const router = useRouter()

  const authState = useAppSelector(state => state.auth)
  const [data, setData] = useState<Creator>()
  const [isLoading, setLoading] = useState<Boolean>(true)

  const {
    isOpen: isOpenAddWorkModal,
    onOpen: onOpenAddWorkModal,
    onClose: onCloseAddWorkModal
  } = useDisclosure()

  const {
    isOpen: isOpenEditProfileModal,
    onOpen: onOpenEditProfileModal,
    onClose: onCloseEditProfileModal
  } = useDisclosure()

  const getProfileData = () => {
    setLoading(true)
    getCreatorByUserId(authState.id).then(data => {
      setData(data)
      setLoading(false)
    })
  }

  const removeVideo = (id: number) => {
    setLoading(true)
    removeWork(id).then(() => {
      getProfileData()
      setLoading(false)
    })
  }

  useEffect(() => {
    if (authState.id != 0) {
      getProfileData()
    }
  }, [authState])

  if (isLoading) {
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    )
  } else if (authState == null || authState.role !== 'creator') {
    router.push('/').then()
  } else if (data == null) {
    return <CrateCreatorProfilePage />
  } else {
    return (
      <Box>
        <AddWorkModal
          onSubmit={getProfileData}
          onClose={onCloseAddWorkModal}
          isOpen={isOpenAddWorkModal}
        />
        <EditProfileModal
          onSubmit={getProfileData}
          onClose={onCloseEditProfileModal}
          isOpen={isOpenEditProfileModal}
          creatorData={data}
        />
        <Image
          rounded={'2xl'}
          alt={'Profile thumbnail'}
          src={data?.thumbnail}
          fit={'cover'}
          align={'center'}
          w={'100%'}
          h={{ base: '100px', sm: '200px', lg: '300px' }}
        />
        <Stack
          direction={{ base: 'column', xl: 'row' }}
          mt={{ base: 4, lg: 8 }}
          align={'start'}
          spacing={{ base: 4, lg: 8 }}
        >
          <Box w={{ base: '100%', xl: '50%', '2xl': '33%' }}>
            <VStack
              bg={'#3a3651'}
              p={6}
              rounded={'2xl'}
              spacing={4}
              align="stretch"
            >
              <Avatar size="xl" name={data?.username} src={data?.avatar} />
              <Heading>{data?.username}</Heading>
              <Rating rating={calculateAverageRating(data!.reviews)} />
              <Text>{data?.description}</Text>
              <HStack>
                <FiMapPin />
                <Text>{data?.address}</Text>
              </HStack>
              <Flex gap={2} wrap={'wrap'}>
                {data?.tagsInCreator.map(res => {
                  return (
                    <Badge
                      key={res.tag.id}
                      px={2}
                      py={1}
                      variant="solid"
                      colorScheme={'green'}
                      fontWeight={'400'}
                    >
                      {res.tag.name}
                    </Badge>
                  )
                })}
              </Flex>
              <Button
                bg={'#ff7551'}
                color={'white'}
                _hover={{
                  bg: '#b25138'
                }}
                rightIcon={<EditIcon />}
                onClick={onOpenEditProfileModal}
              >
                Редактировать
              </Button>
            </VStack>
          </Box>
          <Stack
            width={'100%'}
            justifyContent={'center'}
            mb={{ base: '2', md: '5' }}
          >
            <HStack spacing={5} mb={{ base: '2', md: '5' }}>
              <Heading noOfLines={1} as="h4">
                Список работ
              </Heading>
              <Button
                rightIcon={<BiPlus />}
                colorScheme="blue"
                variant="outline"
                onClick={onOpenAddWorkModal}
              >
                Добавить
              </Button>
            </HStack>
            <Grid
              templateColumns={{
                base: 'repeat(2, 1fr)',
                '2xl': 'repeat(3, 1fr)'
              }}
              gap={4}
            >
              {data?.works.map(res => {
                return (
                  <GridItem key={res.id} colSpan={{ base: 2, xl: 1 }}>
                    <Box position="relative">
                      <YoutubeEmbed embedId={res.url} />
                      <Flex position="absolute" bottom="0" right="0" p={5}>
                        <IconButton
                          bg={'#b20000'}
                          color={'white'}
                          _hover={{
                            bg: '#ff0000'
                          }}
                          size="lg"
                          aria-label="Удалить"
                          icon={<BiTrash />}
                          onClick={() => removeVideo(res.id)}
                        />
                      </Flex>
                    </Box>
                  </GridItem>
                )
              })}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    )
  }
}

export default ProfilePage
