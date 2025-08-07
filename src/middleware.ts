import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This middleware is a server component and doesn't have access to localStorage
  // In a real application, you should use cookies or JWT tokens for authentication
  
  // For now, skip any middleware protection and rely on client-side auth checks
  return NextResponse.next();
  
  // In a real app, you might do something like:
  // const isAuthenticated = request.cookies.get('auth-token');
  // if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*'],
};
