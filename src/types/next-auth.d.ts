import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    firstName: string
    lastName: string
    avatar: string
  }

  interface Session {
    user: User & {
      firstName: string
      lastName: string
    } & DefaultSession['user']
    token: {
      firstName: string
      lastName: string
    }
  }
}
