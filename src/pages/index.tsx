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
import React, { useEffect, useState } from 'react'
import { getCreators } from '@/src/lib/creators'
import NextLink from 'next/link'
import CreatorCard from '@/src/components/creatorCard'
import { Creator } from '@prisma/client'

function CreatorsBlock() {
  const [data, setData] = useState<Array<Creator>>([])
  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    getCreators().then(data => {
      setData(data.profileList)
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
        Добро пожаловать
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
              rounded={'xl'}
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
                      {'Я видеограф'}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color="#fff">
                      {'Для тех, кто готов творить'}
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
              rounded={'xl'}
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
                      {'Я заказчик'}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color="#fff">
                      {'Для тех, кто нуждается в творцах'}
                    </Text>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </NextLink>
        </GridItem>
      </Grid>
      <Heading noOfLines={1} as="h4" mb={{ base: '2', md: '5' }}>
        Наиболее просматриваемые
      </Heading>
      <CreatorsBlock />
    </Box>
  )
}

export default Page
