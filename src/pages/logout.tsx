import React, { useEffect } from 'react'
import { Box, CircularProgress } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { logout } from '@/src/lib/auth'
import { useAppDispatch } from '@/src/store/store'
import { eraseAuthState } from '@/src/store/authSlice'

function LogoutPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    logout().then(status => {
      if (status === 200) {
        dispatch(eraseAuthState(null))
        router.push('/')
      }
    })
  }, [dispatch, router])

  return (
    <Box>
      <CircularProgress />
    </Box>
  )
}

export default LogoutPage
