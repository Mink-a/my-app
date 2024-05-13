export interface LoginUser {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

export interface User {
  id: string
  email: string
  username: string
  role: string
  createdAt: string
  updatedAt: string
}
