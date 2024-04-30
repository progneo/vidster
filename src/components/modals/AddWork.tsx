import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import getYoutubeVideoId from '@/src/util/getYoutubeVideoId'
import { addWork } from '@/src/lib/works'
import { useEffect } from 'react'

interface AddWorkProps {
  onSubmit: () => void
  onClose: () => void
  isOpen: boolean
}

const FormSchema = z.object({
  url: z.string().min(1, 'Url is required').url('Invalid url')
})

function AddWorkModal({ onClose, isOpen, onSubmit }: AddWorkProps) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: ''
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  useEffect(() => {
    setFocus('url')
  }, [setFocus])

  const onFormSubmit: SubmitHandler<FormSchema> = async data => {
    const id = getYoutubeVideoId(data.url)
    if (id === null) {
      return
    }
    await addWork(id).then(status => {
      if (status === 201) {
        onSubmit()
        onClose()
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalHeader>Добавление работы</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="url">
              <FormLabel>Ссылка на видео (YouTube):</FormLabel>
              <Input
                {...register('url')}
                isInvalid={!!errors.url}
                errorBorderColor="red.300"
                id="url"
              />
            </FormControl>
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
              Добавить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddWorkModal
