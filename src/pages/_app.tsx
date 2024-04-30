import Fonts from '@/src/components/fonts'
import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/src/lib/theme'
import Layout from '@/src/components/layout'
import ReduxProvider from '@/src/store/redux-provider'
import { useAppDispatch } from '@/src/store/store'
import { logout } from '@/src/lib/auth'
import { eraseAuthState } from '@/src/store/authSlice'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

// @ts-ignore
function Website({ Component, router, pageProps: { ...pageProps } }) {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider>
        <Fonts />
        <Layout router={router}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ReduxProvider>
    </ChakraProvider>
  )
}

export default Website
