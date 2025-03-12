import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  
  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get URL information
  const { pathname } = req.nextUrl;
  
  // Define public paths that don't require authentication
  const publicPaths = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
  ];
  
  // Allow access to public paths even if not authenticated
  if (publicPaths.includes(pathname)) {
    return res;
  }

  // Redirect to login if accessing protected routes while not authenticated
  if (!session && !pathname.startsWith('/_next') && !pathname.includes('/api/')) {
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // User is authenticated, proceed to role-based checks (will be handled by route components)
  return res;
}

// Run the middleware on all routes except static files and API routes that handle their own auth
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}; 