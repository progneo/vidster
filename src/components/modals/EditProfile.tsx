import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import {
  Badge,
  Button,
  Center,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import Creator from '@/src/types/Creator'
import Tag from '@/src/types/Tag'
import { editCreator } from '@/src/lib/creators'
import { getTags } from '@/src/lib/tags'
import { BiPlus } from 'react-icons/bi'

interface EditProfileProps {
  onSubmit: () => void
  onClose: () => void
  isOpen: boolean
  creatorData: Creator
}

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().min(1, 'Description is required'),
  avatar: z.string().min(1, 'Avatar is required').url('Wrong url'),
  thumbnail: z.string().min(1, 'Thumbnail is required').url('Wrong url')
})

function EditProfileModal({
  onClose,
  isOpen,
  onSubmit,
  creatorData
}: EditProfileProps) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: creatorData.username,
      address: creatorData.address,
      description: creatorData.description,
      avatar: creatorData.avatar,
      thumbnail: creatorData.thumbnail
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  const [tags, setTags] = useState<Array<Tag>>()
  const [selectedTags, setSelectedTags] = useState<Array<Tag>>([])
  const [isLoading, setLoading] = useState<Boolean>(true)

  const onFormSubmit: SubmitHandler<FormSchema> = async data => {
    await editCreator({
      username: data.name,
      address: data.address,
      description: data.description,
      avatar: data.avatar,
      thumbnail: data.thumbnail,
      tags: selectedTags.map(t => t.id)
    }).then(status => {
      if (status === 204) {
        onSubmit()
        onClose()
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

  if (isLoading)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактирование профиля</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Отмена</Button>
            <Button
              bg={'#ff7551'}
              color={'white'}
              _hover={{
                bg: '#b25138'
              }}
              ml={3}
              isLoading={true}
            >
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalHeader>Редактирование профиля</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                <Text>Тэги</Text>
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
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Отмена</Button>
            <Button
              bg={'#ff7551'}
              color={'white'}
              _hover={{
                bg: '#b25138'
              }}
              ml={3}
              isLoading={isSubmitting}
              type="submit"
            >
              Сохранить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default EditProfileModal
