import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

const AboutPage = () => {
  return (
    <Box>
      <Heading display="inline-block" as="h2" size="2xl">
        О нас
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Vidster - это универсальный инструмент, который поможет вам найти друг
        друга и реализовать свои творческие идеи.
      </Text>
      <Heading textAlign="center" mt={5}>
        Наша миссия
      </Heading>
      <Grid templateColumns={'repeat(2, 1fr)'} gap={4} mt={3}>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <Box
            w={'full'}
            rounded={'lg'}
            p={5}
            h={'100%'}
            backgroundColor={'#1fa373'}
          >
            <Text fontSize={'xl'} color="#fff" fontWeight="bold" mb={3}>
              {'Предоставить видеографам:'}
            </Text>
            <UnorderedList>
              <ListItem>
                Простую и удобную платформу для создания профилей, загрузки
                портфолио и общения с потенциальными клиентами.
              </ListItem>
              <ListItem>
                Возможность расширить свою клиентскую базу и увеличить
                количество заказов
              </ListItem>
            </UnorderedList>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <Box w={'full'} rounded={'lg'} p={5} backgroundColor={'#1fa373'}>
            <Text fontSize={'xl'} color="#fff" fontWeight="bold" mb={3}>
              Обеспечить заказчикам:
            </Text>
            <UnorderedList>
              <ListItem>
                Широкий выбор видеографов, соответствующих вашему бюджету и
                требованиям.
              </ListItem>
              <ListItem>
                Удобный поиск по фильтрам, позволяющий быстро найти подходящего
                специалиста.
              </ListItem>
              <ListItem>
                Возможность ознакомиться с портфолио и отзывами других клиентов.
              </ListItem>
            </UnorderedList>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default AboutPage
