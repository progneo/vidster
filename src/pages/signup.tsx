import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Switch
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { signup } from '@/src/lib/auth'

const FormSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required')
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
  })

function SignupCard() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  const [showPassword, setShowPassword] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    const firstName = data.firstName
    const lastName = data.lastName
    const email = data.email
    const password = data.password
    await signup({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isCreator: !isOrdering
    }).then(status => {
      if (status === 201) {
        router.push('/signin')
      }
    })
  }

  useEffect(() => {
    setFocus('firstName')
  }, [])

  return (
    <Flex justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Регистрация
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={'#3a3651'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack spacing={4} justify={'center'}>
                <Text>Я создаю</Text>
                <Switch
                  id="isOrdering"
                  colorScheme={'red'}
                  onChange={() => setIsOrdering(isOrdering => !isOrdering)}
                />
                <Text>Я заказываю</Text>
              </HStack>
              <HStack>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="firstName">Имя</FormLabel>
                    <Input
                      {...register('firstName')}
                      isInvalid={!!errors.firstName}
                      errorBorderColor="red.300"
                      id="firstName"
                      type="text"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="lastName">Фамилия</FormLabel>
                    <Input
                      {...register('lastName')}
                      isInvalid={!!errors.lastName}
                      errorBorderColor="red.300"
                      id="lastName"
                      type="text"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  {...register('email')}
                  isInvalid={!!errors.email}
                  errorBorderColor="red.300"
                  id="email"
                  type="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Пароль</FormLabel>
                <InputGroup>
                  <Input
                    {...register('password')}
                    isInvalid={!!errors.password}
                    errorBorderColor="red.300"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="confirmPassword">
                  Подтверждение пароля
                </FormLabel>
                <InputGroup>
                  <Input
                    {...register('confirmPassword')}
                    isInvalid={!!errors.confirmPassword}
                    errorBorderColor="red.300"
                    id="confirmPassword"
                    type={'password'}
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  bg={'#ff7551'}
                  color={'white'}
                  _hover={{
                    bg: '#b25138'
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Зарегистрироваться
                </Button>
              </Stack>
              <HStack pt={6} justifyContent={'center'}>
                <Text align={'center'}>Уже зарегистрированы?</Text>
                <NextLink href={'signin'}>
                  <Text color={'#ff7551'}>Войти</Text>
                </NextLink>
              </HStack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignupCard
