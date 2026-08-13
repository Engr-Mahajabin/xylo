import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Check if user is trying to access /dashboard and is NOT an admin
    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      token?.role !== "admin"
    ) {
      // Redirect regular users to Home page or Unauthorized page
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User must be logged in
    },
    pages: {
      signIn: "/login",
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
