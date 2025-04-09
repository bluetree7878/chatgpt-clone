'use server';

import { getUserByEmail } from '@/data/user';
import db from '@/db';
import { user } from '@/db/schema';
import { SignUpSchema } from '@features/auth/schemas/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const signUp = async (_: any, formData: FormData) => {
	// 1. validate Field
	const validateFields = SignUpSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validateFields.success) {
		return {
			errorMessage: '입력값이 올바르지 않습니다.',
		};
	}

	// 2. 존재하는 사용자인지 체크
	const { name, email, password } = validateFields.data;

	// 4. 성공/실패처리
	try {
		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return {
				errorMessage: '이미 존재하는 사용자 입니다.',
			};
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		// 3. insert db
		await db.insert(user).values({
			name,
			email,
			password: hashedPassword,
		});
	} catch (error) {
		console.log('error: ', error);
		return {
			errorMessage: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
		};
	}
	redirect('/login');
};
