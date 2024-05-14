import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: User
    jwt: string
  }

  interface User {
    id: string
    email: string
    username: string
    role: string
    jwt: string
    createdAt: string
    updatedAt: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    jwt: string
    username: string
    role: string
  }
}
