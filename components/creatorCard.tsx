'use client'

import Creator from '@/data/Creator';
import {
    Heading,
    Avatar,
    Box,
    Image,
    Flex,
    Text,
    Stack,
    Container,
    Badge,
} from '@chakra-ui/react'
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";

interface RatingProps {
    rating: number
}

interface CreatorCardProps {
    creator: Creator
}

function Rating({rating}: RatingProps) {
    return (
        <Box display="flex" alignItems="center">
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                key={i}
                                style={{marginLeft: '1'}}
                                color={i < rating ? 'teal.500' : 'gray.300'}
                            />
                        )
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{marginLeft: '1'}}/>
                    }
                    return <BsStar key={i} style={{marginLeft: '1'}}/>
                })}
        </Box>
    )
}

function CreatorCard({creator}: CreatorCardProps) {
    return (
        <Box
            w={'full'}
            bg={'#252835'}
            rounded={'xl'}
            overflow={'hidden'}>
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
                            border: '1px solid white',
                        }}
                    />
                </Flex>
                <Box pb={6} mt={-6}>
                    <Stack spacing={1} mb={3}>
                        <Text color={'gray.500'}>{creator.name}</Text>
                        <Heading fontSize={'1xl'} fontWeight={500} fontFamily={'body'}>
                            {creator.description}
                        </Heading>
                    </Stack>
                    <Rating rating={4.3}/>
                    <Stack align={'center'} direction={'row'} mt={5}>
                        {creator.tags.map((tag, i) => {
                            return <Badge key={i} px={2} py={1} bg={'#cc5d40'} fontWeight={'400'}>{tag}</Badge>
                        })}
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}

export default CreatorCard