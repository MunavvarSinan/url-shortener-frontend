import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/auth';

// 1. Specify protected and public routes
const protectedRoutes = ['/url'];
const publicRoutes = ['/sign-in', '/sign-up', '/'];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 3. Decrypt the session from the cookie
    const session = await getSession();
    // 4. Redirect
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }

    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/url')
    ) {
        return NextResponse.redirect(new URL('/url', req.nextUrl));
    }

    return NextResponse.next();
}