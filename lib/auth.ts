import fetchClient from '@/lib/fetch-client'
import { jwt } from '@/lib/utils'
import { randomBytes, randomUUID } from 'crypto'
import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await fetchClient({
            method: 'POST',
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/auth/login',
            body: JSON.stringify(credentials),
          })

          if (!response.ok) {
            throw response
          }

          const data = await response.json()

          return { ...data.user, jwt: data.accessToken }
        } catch (error) {
          if (error instanceof Response) {
            return null
          }

          throw new Error('An error has occurred during login request')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.jwt = user.jwt
        token.role = user.role
        token.username = user.username
      }
      return token
    },

    async session({ session, token }) {
      session.jwt = token.jwt
      session.user.email = token.email || ''
      session.user.username = token.username || ''
      session.user.name = token.username || ''
      session.user.role = token.role || ''

      return session
    },
  },
}
