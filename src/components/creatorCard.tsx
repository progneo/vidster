import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Container,
  Badge
} from '@chakra-ui/react'
import Rating from '@/src/components/rating'
import NextLink from 'next/link'
import { Creator } from '@prisma/client'

interface CreatorCardProps {
  creator: Creator
}

function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <NextLink href={`profile/${creator.id}`}>
      <Box w={'full'} bg={'#252835'} rounded={'xl'} overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={creator.thumbnail}
          objectFit="cover"
          alt="#"
        />
        <Container>
          <Flex justify={'end'} mt={-12}>
            <Avatar
              size={'xl'}
              src={creator.avatar}
              css={{
                border: '1px solid white'
              }}
            />
          </Flex>
          <Box pb={6} mt={-6}>
            <Stack spacing={1} mb={3}>
              <Text color={'gray.500'}>{creator.username}</Text>
              <Heading fontSize={'1xl'} fontWeight={500} fontFamily={'body'}>
                {creator.description}
              </Heading>
            </Stack>
            <Rating rating={4.3} />
            <Stack align={'center'} direction={'row'} wrap={'wrap'} mt={5}>
              {creator.tags.map(res => {
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
            </Stack>
          </Box>
        </Container>
      </Box>
    </NextLink>
  )
}

export default CreatorCard
