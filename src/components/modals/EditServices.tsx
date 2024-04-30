// @ts-nocheck
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
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack
} from '@chakra-ui/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import Tag from '@/src/types/Tag'
import { BiPlus } from 'react-icons/bi'
import { postServices } from '@/src/lib/services'
import Service from '@/src/types/Service'

interface EditServicesProps {
  onSubmit: () => void
  onClose: () => void
  isOpen: boolean
  services: Service[]
}

const generateZodSchemaFromServices = (services: Array<string>) => {
  const schemaProperties = services?.reduce((acc, service, index) => {
    const serviceSchema = {
      [`service_${index}`]: z.string().min(1)
    }
    return { ...acc, ...serviceSchema }
  }, {})

  return z.object(schemaProperties)
}

function EditServicesModal({
  onClose,
  isOpen,
  onSubmit,
  services
}: EditServicesProps) {
  const [selectedServices, setSelectedServices] = useState<Array<string>>([])

  useEffect(() => {
    const basicServices: string[] = services
      ?.filter(s => s.id === 1 || s.id === 2)
      .map(s => s.name)
    setSelectedServices(basicServices)
  }, [])

  const schema = generateZodSchemaFromServices(selectedServices)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  })

  const onFormSubmit: SubmitHandler<z.infer<typeof schema>> = async data => {
    const newServices = selectedServices.map((service, index) => {
      const fieldName = `service_${index}`
      const fieldValue = data[fieldName]
      return {
        name: selectedServices[index],
        price: fieldValue
      }
    })
    await postServices(newServices).then(status => {
      if (status === 204) {
        onSubmit()
        onClose()
      }
    })
  }

  const handleServiceSelect = (service: Service) => {
    const isServiceSelected = selectedServices?.some(s => s === service.name)
    if (isServiceSelected) {
      setSelectedServices(selectedServices.filter(s => s !== service.name))
    } else {
      setSelectedServices([...selectedServices, service.name])
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalHeader>Редактирование услуг</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {selectedServices?.map((service, index) => {
                const fieldName = `service_${index}`
                return (
                  <FormControl key={index} id={`service-control-${index}`}>
                    <FormLabel>{service}</FormLabel>
                    <Input
                      {...register(fieldName)}
                      isInvalid={!!errors[fieldName]}
                      errorBorderColor="red.300"
                      id={`service-${index}`}
                    />
                  </FormControl>
                )
              })}
              <Menu>
                <MenuButton as={Button} rightIcon={<BiPlus />}>
                  Добавить услугу
                </MenuButton>
                <MenuList>
                  {services
                    ?.filter(s => s.id !== 1 && s.id !== 2)
                    .map((service: Tag, i) => {
                      return (
                        <MenuItem
                          key={i}
                          onClick={() => handleServiceSelect(service)}
                        >
                          {service.name}
                        </MenuItem>
                      )
                    })}
                </MenuList>
              </Menu>
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

export default EditServicesModal
