// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";

export async function middleware(req) {
  // Get the JWT token from the request
  const token = await getToken({ req });

  // Define the authentication-related paths to exclude
  const authPaths = ["/login", "/signup"];

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // If the request is to an auth path, allow it to proceed without redirection
  if (authPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect logic
  if (isAuthenticated) {
    // User is logged in, redirect to /jobs if trying to access auth paths
    if (authPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/jobs", req.url)); // Redirect to /jobs
    }
  } else {
    // User is not authenticated, redirect to / if trying to access protected paths
    if (req.nextUrl.pathname.startsWith("/jobs")) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to /
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to run on all paths except auth
export const config = {
  matcher: "/((?!api|_next/static|_next/image|login|signup).*)", // Exclude API, static, and auth routes
};

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
});
