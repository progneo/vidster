import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Creator from '@/src/data/Creator'
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

function Profile() {
  const router = useRouter()
  const id = router.query.id

  const [data, setData] = useState<Creator>(null)
  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    getCreatorById(id).then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])

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
            <Avatar size="xl" name={data.name} src={data.avatar} />
            <Heading>{data.name}</Heading>
            <Rating rating={data.rating} />
            <Text>{data.description}</Text>
            <HStack>
              <FiMapPin />
              <Text>{data.address}</Text>
            </HStack>
            <Flex gap={2}>
              {data.tags.map((tag, i) => {
                return (
                  <Badge
                    key={i}
                    px={2}
                    py={1}
                    variant="solid"
                    colorScheme={'green'}
                    fontWeight={'400'}
                  >
                    {tag}
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
            <GridItem colSpan={{ base: 2, xl: 1 }}>
              <YoutubeEmbed embedId={'JGgnJ0XKGN4'} />
            </GridItem>
            <GridItem colSpan={{ base: 2, xl: 1 }}>
              <YoutubeEmbed embedId={'JGgnJ0XKGN4'} />
            </GridItem>
            <GridItem colSpan={{ base: 2, xl: 1 }}>
              <YoutubeEmbed embedId={'JGgnJ0XKGN4'} />
            </GridItem>
            <GridItem colSpan={{ base: 2, xl: 1 }}>
              <YoutubeEmbed embedId={'JGgnJ0XKGN4'} />
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Profile
