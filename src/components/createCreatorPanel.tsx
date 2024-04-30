import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import Tag from '@/src/types/Tag'
import { getTags } from '@/src/lib/tags'
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Textarea
} from '@chakra-ui/react'
import { createCreator } from '@/src/lib/creators'
import { useRouter } from 'next/router'
import { BiPlus } from 'react-icons/bi'

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().min(1, 'Description is required'),
  avatar: z.string().min(1, 'Avatar is required').url('Wrong url'),
  thumbnail: z.string().min(1, 'Thumbnail is required').url('Wrong url')
})

function CrateCreatorProfilePage() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      address: '',
      description: '',
      avatar: '',
      thumbnail: ''
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  const router = useRouter()
  const [tags, setTags] = useState<Array<Tag>>()
  const [selectedTags, setSelectedTags] = useState<Array<Tag>>([])
  const [isLoading, setLoading] = useState<Boolean>(true)

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    console.log(selectedTags.map(t => t.id))
    await createCreator({
      username: data.name,
      address: data.address,
      description: data.description,
      avatar: data.avatar,
      thumbnail: data.thumbnail,
      tags: selectedTags.map(t => t.id)
    }).then(status => {
      if (status === 201) {
        router.push('/')
      }
    })
  }

  const handleTagSelect = (tag: Tag) => {
    const isTagSelected = selectedTags.some(
      selectedTag => selectedTag.id === tag.id
    )
    if (isTagSelected) {
      setSelectedTags(
        selectedTags.filter(selectedTag => selectedTag.id !== tag.id)
      )
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  useEffect(() => {
    getTags().then(data => {
      setTags(data)
      setLoading(false)
    })
  }, [])

  if (isLoading) {
    return
  }

  return (
    <Flex justify={'center'}>
      <Stack spacing={8} py={12}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Создание профиля</Heading>
        </Stack>
        <Box rounded={'lg'} bg={'#3a3651'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Название</FormLabel>
                <Input
                  {...register('name')}
                  isInvalid={!!errors.name}
                  errorBorderColor="red.300"
                  id="name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Адрес</FormLabel>
                <Input
                  {...register('address')}
                  isInvalid={!!errors.address}
                  errorBorderColor="red.300"
                  id="password"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Описание</FormLabel>
                <Textarea
                  {...register('description')}
                  isInvalid={!!errors.description}
                  errorBorderColor="red.300"
                  id="description"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ссылка на аватар</FormLabel>
                <Input
                  {...register('avatar')}
                  isInvalid={!!errors.avatar}
                  errorBorderColor="red.300"
                  id="avatar"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ссылка на обложку</FormLabel>
                <Input
                  {...register('thumbnail')}
                  isInvalid={!!errors.thumbnail}
                  errorBorderColor="red.300"
                  id="thumbnail"
                />
              </FormControl>
              <Stack>
                <FormLabel>Тэги</FormLabel>
                <SimpleGrid spacing={2}>
                  {selectedTags.map((tag: Tag) => {
                    return (
                      <Badge
                        key={tag.id}
                        px={2}
                        py={1}
                        variant="solid"
                        colorScheme={'green'}
                        fontWeight={'400'}
                      >
                        {tag.name}
                      </Badge>
                    )
                  })}
                  <Menu>
                    <MenuButton as={Button} rightIcon={<BiPlus />}>
                      Добавить тэг
                    </MenuButton>
                    <MenuList>
                      {tags?.map((tag: Tag, i) => {
                        return (
                          <MenuItem
                            key={i}
                            onClick={() => handleTagSelect(tag)}
                          >
                            {tag.name}
                          </MenuItem>
                        )
                      })}
                    </MenuList>
                  </Menu>
                </SimpleGrid>
              </Stack>
              <Button
                bg={'#ff7551'}
                w={'300px'}
                color={'white'}
                _hover={{
                  bg: '#b25138'
                }}
                type="submit"
                isLoading={isSubmitting}
              >
                Создать профиль
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default CrateCreatorProfilePage
