import { Box, Heading, Text, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, #ff7551, #cc5d40)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <NextLink href={'/'}>
        <Button
          colorScheme="orange"
          bgGradient="linear(to-r, #ff7450, #ff7551, #cc5d40)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </NextLink>
    </Box>
  )
}

export default NotFound
