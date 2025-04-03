'use server';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

interface SessionPayload extends Record<string, unknown> {
  id: string;
  name: string;
}

/**사용자 정보를 JWT로 암호화 */
export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey);
};

/**JWT 토큰을 검증하고 페이로드 추출 */
export const verify = async (session: string | undefined) => {
  try {
    if (!session) {
      throw new Error('세션이 정의되지 않았거나 잘못되었습니다.');
    }
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error) {
    console.error('세션 검증 오류:', error);
  }
};

/**JWT를 쿠키로 저장 (로그인 처리) */
export const createSession = async (payload: SessionPayload) => {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const session = await encrypt(payload);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
};

/**세션 쿠키 삭제 (로그아웃) */
export const deleteSession = async () => {
  (await cookies()).delete('session');
};

/**세션 유효성 검사 후, 없으면 /login으로 리디렉션 */
export const verifySession = async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await verify(cookie);

  if (!session?.id) {
    redirect('/login');
  }

  return session;
};
