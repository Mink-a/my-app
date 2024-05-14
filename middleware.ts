import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'

import { locales } from './components/custom/locales'
import { ROUTES } from './data/const'

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en',
  // localeDetection: false,
})

const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: '/login',
  },
})

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

const publicPages = [
  '/',
  '/login',
  // (/secret requires auth)
]

const authRoutes = [
  ROUTES.dashboard,
  ROUTES.users,
  ROUTES.usersCreate,
  ROUTES.usersUpdate,
]
const guestRoutes = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
]

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
