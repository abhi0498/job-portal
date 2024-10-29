// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

// // Define available locales and default locale
// const intlMiddleware = createIntlMiddleware({
//   locales: ["en", "vi-VN"],
//   defaultLocale: "en",
//   localePrefix: "never",
// });

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  const pathname = request.nextUrl.pathname;

  // Define authentication-related paths
  const authPaths = ["/auth/signin", "/auth/register"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // Redirect logic for authentication
  if (isAuthenticated && isAuthPath) {
    // Redirect authenticated users away from auth pages
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the auth path without intl middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
