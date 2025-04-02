'use client';

import { useActionState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import FormCard from './FormCard';
import FormMessage from './FormMessage';
import Submit from './Submit';
import { useFormValidate } from '@/hooks/useFormValidate';
import { SignUpSchema } from '@/schemas/auth';
import { SignUpFormError } from '@/types/form.d';
import { signUp } from '@/actions/signup';
import toast from 'react-hot-toast';

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
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="회원가입"
      footer={{ label: '이미 계정이 있으십니까?', href: '/login' }}
    >
      <form action={action} className="space-y-6">
        {/* 이름 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name">이름</label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요."
            onChange={handleChange}
            error={!!errors?.name}
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
        {/* 이메일 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="example@example.com"
            onChange={handleChange}
            error={!!errors?.email}
          />
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>
        {/* 비밀번호 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            onChange={handleChange}
            error={!!errors?.password}
          />
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        <Submit className="w-full font-extrabold">가입하기</Submit>
      </form>
    </FormCard>
  );
}
