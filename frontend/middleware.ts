import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const pathname = request.nextUrl.pathname;

  // Public routes
  const publicRoutes = ['/', '/login', '/pricing', '/privacy', '/terms'];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] 
};
