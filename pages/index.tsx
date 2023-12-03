import {
    Box,
    Grid,
    GridItem,
    Heading,
    Stack,
    Text
} from "@chakra-ui/react";
import CreatorCard from "@/components/creatorCard";
import Creator from "@/data/Creator";

const Page = () => {
    const creators: Array<Creator> = [
        {
            name: 'Burkalo',
            description: 'We\'re the best filmmakers in the world',
            avatar: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
            thumbnail: 'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            rating: 4.3,
            tags: ['tag', 'tag']
        },
        {
            name: 'Burkalo',
            description: 'We\'re the best filmmakers in the world',
            avatar: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
            thumbnail: 'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            rating: 4.3,
            tags: ['tag', 'tag']
        },
        {
            name: 'Burkalo',
            description: 'We\'re the best filmmakers in the world',
            avatar: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
            thumbnail: 'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            rating: 4.3,
            tags: ['tag', 'tag']
        },
        {
            name: 'Burkalo',
            description: 'We\'re the best filmmakers in the world',
            avatar: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
            thumbnail: 'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            rating: 4.3,
            tags: ['tag', 'tag']
        },
    ]

    return (
        <Box>
            <Heading noOfLines={1} as='h4' mb={{base: '2', md: '5'}}>Discover</Heading>
            <Grid mb={{base: '5', md: '10'}} templateColumns={'repeat(3, 1fr)'} gap={4}>
                <GridItem colSpan={{base: 3, lg: 2}}>
                    <Box
                        w={"full"}
                        rounded={'lg'}
                        overflow={'hidden'}
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize={'cover'}
                        backgroundImage={'/images/creating.png'}>
                        <Box background={'linear-gradient(90deg, #FF7551, rgba(13, 170, 188, 0.00))'}>
                            <Box p={5} height={{base: "200px", md: "300px", lg: "400px"}} position="relative">
                                <Stack
                                    spacing={2}
                                    w={'full'}
                                    maxW={'lg'}
                                    position="absolute"
                                    top="50%"
                                    transform="translate(0, -50%)">
                                    <Heading fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}>
                                        {"Let me cook"}
                                    </Heading>
                                    <Text fontSize={{base: 'md', lg: 'lg'}} color="#fff">
                                        {"For those, how can create"}
                                    </Text>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </GridItem>
                <GridItem colSpan={{base: 3, lg: 1}}>
                    <Box
                        w={"full"}
                        rounded={'md'}
                        overflow={'hidden'}
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize={'cover'}
                        backgroundImage={'/images/ordering.png'}>
                        <Box background={'linear-gradient(90deg, #618dc4, rgba(13, 170, 188, 0.00))'}>
                            <Box p={5} height={{base: "200px", md: "300px", lg: "400px"}} position="relative">
                                <Stack
                                    spacing={2}
                                    w={'full'}
                                    maxW={'lg'}
                                    position="absolute"
                                    top="50%"
                                    transform="translate(0, -50%)">
                                    <Heading fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}>
                                        {"Ordering"}
                                    </Heading>
                                    <Text fontSize={{base: 'md', lg: 'lg'}} color="#fff">
                                        {"For the needy"}
                                    </Text>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </GridItem>
            </Grid>
            <Heading noOfLines={1} as='h4' mb={{base: '2', md: '5'}}>Most Watched</Heading>
            <Grid templateColumns={'repeat(4, 1fr)'} gap={4}>
                {creators.map((creator: Creator, i) => {
                    return <GridItem key={i} colSpan={{base: 4, lg: 2, xl: 1}}>
                        <CreatorCard creator={creator}/>
                    </GridItem>
                })}
            </Grid>
        </Box>
    )
}

export default Page