'use server';

import bcrypt from 'bcryptjs';
import { createSession } from './sessions';
import { redirect } from 'next/navigation';
import { LoginSchema } from '@/features/auth/schemas/auth';
import { getUserByEmail } from '@/data/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (_: any, formData: FormData) => {
  // 1. validate Field
  const validateFields = LoginSchema.safeParse({
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
  const { email, password } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return {
        errorMessage: '존재하지 않는 사용자입니다.',
      };
    }

    const { id, name, password: userPassword } = existingUser;

    const passwordMatch = await bcrypt.compare(password, userPassword);
    if (!passwordMatch) {
      return {
        errorMessage: '비밀번호가 일치하지 않습니다.',
      };
    }

    await createSession({ id, name });
  } catch (error) {
    console.log('error: ', error);
    return {
      errorMessage: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
    };
  }

  redirect('/');
};
