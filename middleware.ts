import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from './components/custom/locales';

// const authMiddleware = withAuth(
//   async function middleware(request) {
//     const token = await getToken({
//       req: request,
//       secret: process.env.NEXTAUTH_SECRET,
//     });
//     const isIndexPage = request.nextUrl.pathname === '/';
//     const isAuthRoute = authRoutes.some((route) =>
//       request.nextUrl.pathname.startsWith(route)
//     );
//     const isGuestRoute = guestRoutes.some((route) =>
//       request.nextUrl.pathname.startsWith(route)
//     );

//     if (!token && isAuthRoute) {
//       const redirectUrl = new URL('/login', request.url);
//       redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
//       return NextResponse.redirect(redirectUrl);
//     }

//     if (token) {
//       if (isIndexPage || isGuestRoute) {
//         return NextResponse.redirect(new URL('/users', request.url));
//       }
//     }
//   },
//   {
//     callbacks: {
//       async authorized({ token }) {
//         return true;
//       },
//     },
//   }
// );

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en',
  localeDetection: false,
});

const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: '/login',
  },
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${guestRoutes
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

const guestRoutes = ['/login'];

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
