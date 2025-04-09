import db from '@/db';
import { user } from '@/db/schema';
import type { User } from '@/types/db';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string): Promise<User | null> => {
	try {
		const existingUser = await db.query.user.findFirst({
			where: eq(user.email, email),
		});

		if (!existingUser) {
			return null;
		}

		return existingUser;
	} catch (error) {
		console.error(error);
		throw new Error('DB 에러 발생');
	}
};
