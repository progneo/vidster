import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import { NextRouter } from 'next/router'
import React from 'react'
import SidebarWithHeader from '@/components/navbar'

interface MainProps {
  children: React.ReactNode
  router: NextRouter
}

const Main = ({ children, router }: MainProps) => {
  return (
    <Box>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Vidster</title>
      </Head>

      <SidebarWithHeader path={router.asPath}>{children}</SidebarWithHeader>
    </Box>
  )
}

export default Main