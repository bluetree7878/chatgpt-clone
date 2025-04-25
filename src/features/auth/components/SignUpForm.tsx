'use client';

import { Input } from '@/components/ui/input';
import { useFormValidate } from '@features/auth/hooks/useFormValidate';
import { SignUpSchema } from '@features/auth/schemas/auth';
import { signUp } from '@features/auth/services/signup';
import type { SignUpFormError } from '@features/auth/type';
import { useActionState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FormCard from './FormCard';
import FormMessage from './FormMessage';
import Submit from './Submit';

export default function SignUpForm() {
	const [error, action, isPending] = useActionState(signUp, undefined);
	const { errors, validateField } =
		useFormValidate<SignUpFormError>(SignUpSchema);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		validateField(name, value);
	};

	useEffect(() => {
		if (error) {
			toast.error(error.errorMessage ?? '예기치 않은 오류가 발생했습니다.');
		}
	}, [error]);

	return (
		<FormCard
			title='회원가입'
			footer={{ label: '이미 계정이 있으십니까?', href: '/login' }}
		>
			<form action={action} className='space-y-6'>
				{/* 이름 */}
				<div className='flex flex-col gap-1'>
					<label htmlFor='name'>이름</label>
					<Input
						id='name'
						name='name'
						placeholder='이름을 입력해주세요.'
						onChange={handleChange}
						error={!!errors?.name}
					/>
					{errors?.name && <FormMessage message={errors?.name[0]} />}
				</div>
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
					{isPending ? '처리중...' : '회원가입'}
				</Submit>
			</form>
		</FormCard>
	);
}
