'use client'

import { SessionProvider } from 'next-auth/react'

interface AuthProviderProps {
  children: React.ReactNode
  session?: any
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
