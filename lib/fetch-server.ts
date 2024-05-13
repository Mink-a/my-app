import 'server-only'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { ServerError, UnauthorizedError } from './exceptions'
import { signOut } from 'next-auth/react'

interface fetchServerProps {
  method?: string
  url: string
  body?: string
}

async function fetchServer({
  method = 'GET',
  url,
  body = '',
}: fetchServerProps) {
  try {
    const session = await getServerSession(authOptions)
    const accessToken = session?.jwt

    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: body || undefined,
    })

    if (!response.ok) {
      throw response
    }

    return response
  } catch (error) {
    if (error instanceof Response) {
      if (error.status === 401) {
        signOut()
        throw new UnauthorizedError()
      } else {
        throw new ServerError('Failed to fetch data')
      }
    }
    console.log('hei')
    throw new ServerError('Failed to fetch data')
  }
}

export default fetchServer
