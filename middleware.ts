export const API_AUTH_PREFIX = "/api/auth";
export const GUEST_ROUTES = ["/login", "/register"];
export const PUBLIC_ROUTES = ["/"];

import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const nextUrl = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isGuestRoute = GUEST_ROUTES.includes(nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;

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
