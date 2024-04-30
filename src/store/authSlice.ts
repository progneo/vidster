import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import UserData from '../types/UserData'

export interface AuthState {
  id: number
  isAuthorized: boolean
  firstName: string
  lastName: string
  avatar: string
  role: string
}

const initialState: AuthState = {
  id: 0,
  isAuthorized: false,
  firstName: '',
  lastName: '',
  avatar: '',
  role: 'guest'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.id = action.payload.id
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.avatar = action.payload.avatar
      state.role = action.payload.role
    },
    eraseAuthState: (state, action: PayloadAction<null>) => {
      state.id = 0
      state.firstName = ''
      state.lastName = ''
      state.avatar =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/240px-User-avatar.svg.png'
      state.role = 'guest'
    }
  }
})

export const { setAuthState, setUserData, eraseAuthState } = authSlice.actions
export const authReducer = authSlice.reducer
