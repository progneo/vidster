import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters')
})

function SignInCard() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    const signInData = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (signInData?.error) {
      console.log(signInData.error)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    setFocus('email')
  }, [])

  return (
    <Flex justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={'lg'} bg={'#3a3651'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  {...register('email')}
                  isInvalid={!!errors.email}
                  errorBorderColor="red.300"
                  type="email"
                  id="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register('password')}
                  isInvalid={!!errors.password}
                  errorBorderColor="red.300"
                  type="password"
                  id="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox colorScheme="red">Remember me</Checkbox>
                  <NextLink href={'#'}>
                    <Text color={'#ff7551'}>Forgot password?</Text>
                  </NextLink>
                </Stack>
                <Button
                  bg={'#ff7551'}
                  color={'white'}
                  _hover={{
                    bg: '#b25138'
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignInCard
