'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * 환경 변수에서 JWT 시크릿 키를 가져와 인코딩합니다.
 * 시크릿 키가 없을 경우 에러를 발생시킵니다.
 */
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
	throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
}
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * JWT 토큰의 페이로드 인터페이스
 */
export interface JWTPayload extends Record<string, unknown> {
	id: string;
	name: string;
}

/**
 * 사용자 정보를 JWT로 암호화합니다.
 * @param payload - 암호화할 사용자 정보
 * @returns 암호화된 JWT 토큰
 */
export const encrypt = async (payload: JWTPayload): Promise<string> => {
	return new SignJWT(payload as Record<string, unknown>)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1d')
		.sign(encodedKey);
};

/**
 * JWT 토큰을 검증하고 페이로드를 추출합니다.
 * @param token - 검증할 JWT 토큰 문자열
 * @returns 검증된 페이로드 또는 undefined (검증 실패 시)
 */
export const verify = async (
	token: string | undefined,
): Promise<JWTPayload | undefined> => {
	try {
		if (!token) {
			return undefined;
		}
		const { payload } = await jwtVerify<JWTPayload>(token, encodedKey, {
			algorithms: ['HS256'],
		});

		return payload;
	} catch (error) {
		console.error('토큰 검증 오류:', error);
		return undefined;
	}
};

/**
 * 쿠키에 토큰을 저장합니다. (로그인 시 사용)
 * @param payload - 저장할 사용자 정보
 */
export const createToken = async (payload: JWTPayload): Promise<void> => {
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1일
	const token = await encrypt(payload);

	(await cookies()).set('access_token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	});
};

/**
 * 쿠키에서 토큰을 삭제합니다. (로그아웃 시 사용)
 */
export const deleteToken = async (): Promise<void> => {
	(await cookies()).delete('access_token');
};

/**
 * 토큰 유효성을 검사하고, 유효하지 않은 경우 로그인 페이지로 리디렉션합니다.
 * @returns 유효한 토큰 페이로드
 */
export const verifyToken = async (): Promise<JWTPayload> => {
	const cookie = (await cookies()).get('access_token')?.value;
	const token = await verify(cookie);

	if (!token?.id) {
		redirect('/login');
	}

	return token;
};
