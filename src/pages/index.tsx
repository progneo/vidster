import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react'
import Creator from '@/src/data/Creator'
import React, { useEffect, useState } from 'react'
import { getTopCreators } from '@/src/lib/creators'
import NextLink from 'next/link'
import CreatorCard from '@/src/components/creatorCard'

function CreatorsBlock() {
  const [data, setData] = useState<Array<Creator>>([])
  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    getTopCreators().then(data => {
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
    <Grid templateColumns={'repeat(4, 1fr)'} gap={4}>
      {data.map((creator: Creator, i) => {
        return (
          <GridItem key={i} colSpan={{ base: 4, lg: 2, xl: 1 }}>
            <CreatorCard creator={creator} />
          </GridItem>
        )
      })}
    </Grid>
  )
}

function Page() {
  return (
    <Box>
      <Heading noOfLines={1} as="h4" mb={{ base: '2', md: '5' }}>
        Discover
      </Heading>
      <Grid
        mb={{ base: '5', md: '10' }}
        templateColumns={'repeat(3, 1fr)'}
        gap={4}
      >
        <GridItem colSpan={{ base: 3, lg: 2 }}>
          <NextLink href={'/'}>
            <Box
              w={'full'}
              rounded={'lg'}
              overflow={'hidden'}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize={'cover'}
              backgroundImage={'/images/creating.png'}
            >
              <Box
                background={
                  'linear-gradient(90deg, #FF7551, rgba(13, 170, 188, 0.00))'
                }
              >
                <Box
                  p={5}
                  height={{ base: '200px', md: '300px', lg: '400px' }}
                  position="relative"
                >
                  <Stack
                    spacing={2}
                    w={'full'}
                    maxW={'lg'}
                    position="absolute"
                    top="50%"
                    transform="translate(0, -50%)"
                  >
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                      {'Let me cook'}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color="#fff">
                      {'For those, how can create'}
                    </Text>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </NextLink>
        </GridItem>
        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <NextLink href={'/search'}>
            <Box
              w={'full'}
              rounded={'md'}
              overflow={'hidden'}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize={'cover'}
              backgroundImage={'/images/ordering.png'}
            >
              <Box
                background={
                  'linear-gradient(90deg, #618dc4, rgba(13, 170, 188, 0.00))'
                }
              >
                <Box
                  p={5}
                  height={{ base: '200px', md: '300px', lg: '400px' }}
                  position="relative"
                >
                  <Stack
                    spacing={2}
                    w={'full'}
                    maxW={'lg'}
                    position="absolute"
                    top="50%"
                    transform="translate(0, -50%)"
                  >
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                      {'Ordering'}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color="#fff">
                      {'For the needy'}
                    </Text>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </NextLink>
        </GridItem>
      </Grid>
      <Heading noOfLines={1} as="h4" mb={{ base: '2', md: '5' }}>
        Most Watched
      </Heading>
      <CreatorsBlock />
    </Box>
  )
}

export default Page
