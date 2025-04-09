'use client';

import { Input } from '@/components/ui/input';
import { useFormValidate } from '@/features/auth/hooks/useFormValidate';
import { LoginSchema } from '@/features/auth/schemas/auth';
import { login } from '@/features/auth/services/login';
import type { LoginFormError } from '@/features/auth/types/form';
import { useActionState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FormCard from './FormCard';
import FormMessage from './FormMessage';
import Submit from './Submit';

export default function LoginForm() {
	const [error, action, isPending] = useActionState(login, undefined);
	const { errors, validateField } =
		useFormValidate<LoginFormError>(LoginSchema);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		validateField(name, value);
	};

	useEffect(() => {
		if (error) {
			toast.error(error.errorMessage);
		}
	}, [error]);

	return (
		<FormCard
			title='로그인'
			footer={{ label: '아직 계정이 없으십니까?', href: '/signup' }}
		>
			<form action={action} className='space-y-6'>
				{/* 이메일 */}
				<div className='flex flex-col gap-1'>
					<label htmlFor='email'>이메일</label>
					<Input
						id='email'
						type='email'
						name='email'
						placeholder='example@example.com'
						onChange={handleChange}
						error={!!errors?.email}
					/>
					{errors?.email && <FormMessage message={errors?.email[0]} />}
				</div>
				{/* 비밀번호 */}
				<div className='flex flex-col gap-1'>
					<label htmlFor='password'>비밀번호</label>
					<Input
						id='password'
						name='password'
						type='password'
						placeholder='********'
						onChange={handleChange}
						error={!!errors?.password}
					/>
					{errors?.password && <FormMessage message={errors?.password[0]} />}
				</div>
				<Submit className='w-full font-extrabold' disabled={isPending}>
					{isPending ? '로그인 중...' : '로그인'}
				</Submit>
			</form>
		</FormCard>
	);
}
