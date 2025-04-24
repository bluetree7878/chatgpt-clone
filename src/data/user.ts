import db from '@/db';
import { user } from '@/db/schema';
import type { User } from '@/types/db';
import { eq } from 'drizzle-orm';

/**
 * 이메일로 사용자 조회
 * @param email - 조회할 사용자의 이메일
 * @returns 사용자 객체 또는 null (존재하지 않는 경우)
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
	try {
		const existingUser = await db.query.user.findFirst({
			where: eq(user.email, email),
		});

		return existingUser || null;
	} catch (error) {
		console.error('사용자 조회 중 오류 발생:', error);
		throw new Error('사용자 데이터를 조회하는 중 오류가 발생했습니다.');
	}
};

/**
 * ID로 사용자 조회
 * @param id - 조회할 사용자의 고유 ID
 * @returns 사용자 객체 또는 null (존재하지 않는 경우)
 */
export const getUserById = async (id: string): Promise<User | null> => {
	try {
		const existingUser = await db.query.user.findFirst({
			where: eq(user.id, id),
		});

		return existingUser || null;
	} catch (error) {
		console.error('사용자 조회 중 오류 발생:', error);
		throw new Error('사용자 데이터를 조회하는 중 오류가 발생했습니다.');
	}
};
