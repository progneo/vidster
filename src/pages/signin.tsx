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
  Text,
  VStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getMe, login } from '@/src/lib/auth'
import { setAuthState, setUserData } from '@/src/store/authSlice'
import { useAppDispatch } from '@/src/store/store'

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters')
})

function SignInCard() {
  const router = useRouter()
  const dispatch = useAppDispatch()
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
    const email = data.email
    const password = data.password
    await login({ email, password }).then(status => {
      if (status === 200) {
        dispatch(setAuthState(true))
        getMe().then(userData => dispatch(setUserData(userData)))
        router.push('/')
      }
    })
  }

  useEffect(() => {
    setFocus('email')
  }, [])

  return (
    <Flex justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Вход в аккаунт</Heading>
        </Stack>
        <Box rounded={'lg'} bg={'#3a3651'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  {...register('email')}
                  isInvalid={!!errors.email}
                  errorBorderColor="red.300"
                  type="email"
                  id="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Пароль</FormLabel>
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
                  <Checkbox colorScheme="red">Запомнить меня</Checkbox>
                  <NextLink href={'#'}>
                    <Text color={'#ff7551'}>Забыли пароль?</Text>
                  </NextLink>
                </Stack>
                <VStack>
                  <Button
                    bg={'#ff7551'}
                    w={'300px'}
                    color={'white'}
                    _hover={{
                      bg: '#b25138'
                    }}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Войти
                  </Button>
                  <NextLink href={'/signup'}>
                    <Button
                      bg={'#554f77'}
                      w={'300px'}
                      color={'white'}
                      _hover={{
                        bg: '#1e1c2a'
                      }}
                    >
                      Создать аккаунт
                    </Button>
                  </NextLink>
                </VStack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignInCard
