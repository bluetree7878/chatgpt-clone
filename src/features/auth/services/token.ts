'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

interface JWTPayload extends Record<string, unknown> {
	id: string;
	name: string;
}

/** 사용자 정보를 JWT로 암호화 */
export const encrypt = async (payload: JWTPayload) => {
	return new SignJWT(payload as Record<string, unknown>)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1d')
		.sign(encodedKey);
};

/** JWT 토큰을 검증하고 페이로드 추출 */
export const verify = async (token: string | undefined) => {
	try {
		if (!token) {
			throw new Error('토큰이 정의되지 않았거나 잘못되었습니다.');
		}
		const { payload } = await jwtVerify<JWTPayload>(token, encodedKey, {
			algorithms: ['HS256'],
		});

		return payload;
	} catch (error) {
		console.error('토큰 검증 오류:', error);
	}
};

/** 쿠키에 토큰 저장 (로그인) */
export const createToken = async (payload: JWTPayload) => {
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
	const token = await encrypt(payload);

	(await cookies()).set('access_token', token, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	});
};

/** 쿠키에서 토큰 삭제 (로그아웃) */
export const deleteToken = async () => {
	(await cookies()).delete('access_token');
};

/** 토큰 유효성 검사 후, 없으면 /login으로 리디렉션 */
export const verifyToken = async () => {
	const cookie = (await cookies()).get('access_token')?.value;
	const token = await verify(cookie);

	if (!token?.id) {
		redirect('/login');
	}

	return token;
};
