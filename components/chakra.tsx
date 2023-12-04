import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager
} from '@chakra-ui/react'
import theme from '../lib/theme'
import React from 'react'

interface ChakraProps {
  cookies?: string
  children: React.ReactNode
}

// interface ServerSideProps {
//     req: Request
// }

export default function Chakra({ cookies, children }: ChakraProps) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}

// export async function getServerSideProps({req}: ServerSideProps) {
//     console.log(req)
//     return {
//         props: {
//             cookies: req.headers.cookie ?? ''
//         }
//     }
// }
