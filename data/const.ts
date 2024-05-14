export const ROUTES = {
  // public routes
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password', // + [token]
  // auth routes
  index: '/',
  dashboard: '/dashboard',
  users: '/dashboard/users',
  usersCreate: '/dashboard/users/create',
  usersUpdate: '/dashboard/users/update', // + [userId]
} as const

export type RouteKeys = keyof typeof ROUTES
