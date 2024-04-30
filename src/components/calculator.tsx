import {
  Box,
  Checkbox,
  Divider,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import ServiceOfCreator from '@/src/types/ServiceOfCreator'

function Calculator({ services }: { services: ServiceOfCreator[] }) {
  const [checkedServices, setCheckedServices] = useState(
    new Set<ServiceOfCreator>()
  )
  const [firstSliderValue, setFirstSliderValue] = useState(1)
  const [showFirstTooltip, setShowFirstTooltip] = React.useState(false)

  const [secondSliderValue, setSecondSliderValue] = useState(1)
  const [showSecondTooltip, setShowSecondTooltip] = React.useState(false)

  const basicServices = services
    .filter(s => s.serviceId === 1 || s.serviceId === 2)
    .map(s => s.price)

  const basicPrice = () => {
    return basicServices[0] + basicServices[1]
  }

  const sumOfSelectedServicePrices = () => {
    let total =
      basicServices[0] * firstSliderValue + basicServices[1] * secondSliderValue

    checkedServices.forEach(service => {
      total += service.price
    })
    return total
  }

  const handleCheckboxChange = (serviceOfCreator: ServiceOfCreator) => {
    setCheckedServices(prev => {
      const newChecked = new Set(prev)
      if (newChecked.has(serviceOfCreator)) {
        newChecked.delete(serviceOfCreator)
      } else {
        newChecked.add(serviceOfCreator)
      }
      return newChecked
    })
  }

  return (
    <Box w={'full'} bg={'#252835'} rounded={'xl'} p={4}>
      <Heading noOfLines={1} as="h4" mb={{ base: '2', md: '5' }}>
        Калькулятор дополнительнных услуг
      </Heading>
      <Text>{`Базовая стоимость смены составляет: ${basicPrice()} рублей`}</Text>
      <Divider py={1} />
      <Text pt={3}>Основные услуги:</Text>
      <Text pt={4}>{`Количество съёмочных смен`}</Text>
      <Slider
        aria-label="slider-ex-1"
        value={firstSliderValue}
        min={1}
        max={10}
        onChange={val => setFirstSliderValue(val)}
        onMouseEnter={() => setShowFirstTooltip(true)}
        onMouseLeave={() => setShowFirstTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="#6c5ecf"
          color="white"
          placement="top"
          isOpen={showFirstTooltip}
          label={`${firstSliderValue}`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Text pt={2}>{`Количество монтажных смен`}</Text>
      <Slider
        aria-label="slider-ex-1"
        value={secondSliderValue}
        min={1}
        max={10}
        onChange={val => setSecondSliderValue(val)}
        onMouseEnter={() => setShowSecondTooltip(true)}
        onMouseLeave={() => setShowSecondTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="#6c5ecf"
          color="white"
          placement="top"
          isOpen={showSecondTooltip}
          label={`${secondSliderValue}`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Divider py={1} />
      <Text pt={3}>Дополнительные услуги:</Text>
      <VStack py={2} alignItems={'start'}>
        {services
          ?.filter(s => s.serviceId !== 1 && s.serviceId !== 2)
          .map((serviceOfCreator, i) => (
            <Checkbox
              key={i}
              colorScheme="red"
              isChecked={checkedServices.has(serviceOfCreator)}
              onChange={() => handleCheckboxChange(serviceOfCreator)}
            >
              {serviceOfCreator.service.name}
            </Checkbox>
          ))}
      </VStack>
      <Input
        isReadOnly={true}
        value={`Примерная стоимость проекта: ${sumOfSelectedServicePrices()} рублей`}
      />
      <Divider py={3} />
      <Text fontSize={'xs'} pt={2}>
        *Стоимость примерная и может отличаться от итоговой
      </Text>
    </Box>
  )
}

export default Calculator
