import { ServerError, UnauthorizedError } from './exceptions'

async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      if (response.status === 401) {
        throw new UnauthorizedError()
      } else {
        throw new ServerError()
      }
    }

    return (await response.json()) as TResponse
  } catch (error) {
    throw new ServerError('Failed to fetch data!')
  }
}

export const api = {
  get: <TResponse>(url: string) =>
    request<TResponse>(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiIwOTlmNzcxMC1iODllLTRkNWQtYTRjNS0xNmU1NGU3ZjkwMjgiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3MTU0MDUyODcsImV4cCI6MTcxNjAxMDA4N30.q2_TmQ2hX6UwkKQ9l0fjVx8bKXlteUmqQYB8lHM6HME',
      },
    }),

  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: 'POST', body }),
}
