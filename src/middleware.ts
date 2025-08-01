import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { API_AUTH_PREFIX, GUEST_ROUTES, PUBLIC_ROUTES } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const isLoggedIn = !!request.auth;

  const nextUrl = request.nextUrl;
  const pathname = nextUrl.pathname;

  const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isGuestRoute = GUEST_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isGuestRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/settings", nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
