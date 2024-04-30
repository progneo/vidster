import LoginData from '../types/LoginData'
import RegisterData from '@/src/types/RegisterData'

const getMe = async () => {
  const response = await fetch(`/api/authentication/me`)
  if (!response.ok) {
    throw new Error('Probably unauthorized')
  }
  return response.json()
}

const getAuthorizationStatus = async () => {
  const response = await fetch(`/api/authentication/check_authentication`)
  if (!response.ok) {
    throw new Error('Probably unauthorized')
  }
  return response.json()
}

const signup = async (registerData: RegisterData) => {
  const response = await fetch(`/api/authentication/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
      role: registerData.isCreator ? 'creator' : 'customer'
    })
  })
  if (!response.ok) {
    throw new Error('Wrong data')
  }
  return response.status
}

const login = async (loginData: LoginData) => {
  const response = await fetch(`/api/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password
    })
  })
  if (!response.ok) {
    throw new Error('Wrong data')
  }

  return response.status
}

const logout = async () => {
  const response = await fetch(`/api/authentication/logout`, {
    method: 'POST'
  })

  if (!response.ok) {
    throw new Error('Already unauthorized')
  }
  return response.status
}

export { getMe, getAuthorizationStatus, signup, login, logout }
