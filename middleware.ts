const guestOnly = ["/login", "/register"];
const publicRoutes = ["/"];

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
// import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isApiRoute = pathname.startsWith("/api/auth");
  const isGuestOnly = guestOnly.includes(pathname);
  const isPublic = publicRoutes.includes(pathname);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isGuestOnly) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/settings", req.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
