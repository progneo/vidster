import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getCreatorById } from '@/src/lib/creators'
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { FiMail, FiMapPin } from 'react-icons/fi'
import Rating from '@/src/components/rating'
import YoutubeEmbed from '@/src/components/youtubeEmbed'
import { Creator } from '@prisma/client'

function Profile() {
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState<Creator>(null)
  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    if (id) {
      getCreatorById(Number(id)).then(data => {
        setData(data.profile)
        setLoading(false)
        console.log(data)
      })
    }
  }, [id])

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
    <Box>
      <Image
        rounded={'2xl'}
        alt={'Profile thumbnail'}
        src={data.thumbnail}
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
            <Avatar size="xl" name={data.username} src={data.avatar} />
            <Heading>{data.username}</Heading>
            <Rating rating={'4.5'} />
            <Text>{data.description}</Text>
            <HStack>
              <FiMapPin />
              <Text>{data.address}</Text>
            </HStack>
            <Flex gap={2} wrap={'wrap'}>
              {data.tags.map(res => {
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
              leftIcon={<FiMail />}
              backgroundColor="#6c5ecf"
              variant="solid"
            >
              Email
            </Button>
          </VStack>
        </Box>
        <Stack width={'100%'}>
          <Heading noOfLines={1} as="h4" mb={{ base: '2', md: '5' }}>
            List of works
          </Heading>
          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              '2xl': 'repeat(3, 1fr)'
            }}
            gap={4}
          >
            {data.works.map(res => {
              return (
                <GridItem key={res.id} colSpan={{ base: 2, xl: 1 }}>
                  <YoutubeEmbed embedId={res.url} />
                </GridItem>
              )
            })}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Profile
