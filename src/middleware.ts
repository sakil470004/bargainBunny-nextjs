import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // If accessing auth pages while logged in, redirect to dashboard
  if (request.nextUrl.pathname.startsWith('/auth/') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If accessing protected routes without being logged in, redirect to login
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
};