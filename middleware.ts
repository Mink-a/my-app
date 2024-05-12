import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const isIndexPage = request.nextUrl.pathname === "/";
    const isAuthRoute = authRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );
    const isGuestRoute = guestRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    if (!token && isAuthRoute) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href);
      return NextResponse.redirect(redirectUrl);
    }

    if (token) {
      if (isIndexPage || isGuestRoute) {
        return NextResponse.redirect(new URL("/users", request.url));
      }
    }
  },
  {
    callbacks: {
      async authorized({ token }) {
        return true;
      },
    },
  }
);

const authRoutes = ["/users"];
const guestRoutes = ["/login"];