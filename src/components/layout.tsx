import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import { NextRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import SidebarWithHeader from '@/src/components/navbar/navbar'
import { useAppDispatch, useAppSelector } from '@/src/store/store'
import { getAuthorizationStatus, getMe } from '@/src/lib/auth'
import { setAuthState, setUserData } from '@/src/store/authSlice'

interface MainProps {
  children: React.ReactNode
  router: NextRouter
}

const Layout = ({ children, router }: MainProps) => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector(state => state.auth)

  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    getAuthorizationStatus().then(isAuthorized => {
      dispatch(setAuthState(isAuthorized))

      if (isAuthorized) {
        getMe().then(userData => {
          dispatch(setUserData(userData))
        })
      }
      setLoading(false)
    })
  }, [authState, dispatch])

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

export default Layout
