const GUEST_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/new-verification"];

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
// import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isApiRoute = pathname.startsWith("/api/auth");
  const isGuestRoute = GUEST_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isGuestRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/settings", req.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
