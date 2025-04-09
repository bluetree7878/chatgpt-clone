import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from '@/constants/routes';
import { verify } from '@/features/auth/services/token';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

	const cookie = (await cookies()).get('access_token')?.value;
	const token = await verify(cookie);

	if (!isPublicRoute && !token) {
		return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
	}

	if (isPublicRoute && token) {
		return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
};
