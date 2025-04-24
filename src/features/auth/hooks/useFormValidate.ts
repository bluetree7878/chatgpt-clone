import { useState, useCallback } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';

/**
 * Zod 스키마 기반 폼 유효성 검사 훅
 * @template T - 에러 객체 타입
 * @param schema - Zod 유효성 검사 스키마
 * @returns 에러 상태와 필드 유효성 검사 함수
 */
export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
	const [errors, setErrors] = useState<Partial<T>>();

	/**
	 * 개별 필드의 유효성을 검사하는 함수
	 * @param name - 검사할 필드의 이름
	 * @param value - 검사할 필드의 값
	 */
	const validateField = useCallback(
		(name: string, value: string) => {
			// 기존 오류 상태에서 현재 필드 오류 초기화
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: undefined,
			}));

			try {
				// 해당 필드에 대한 Zod 스키마 추출 및 유효성 검사
				const fieldSchema = schema.pick({ [name]: true });
				const parsedValue = fieldSchema.safeParse({
					[name]: value,
				});

				// 유효성 검사 실패 시 에러 상태 업데이트
				if (!parsedValue.success) {
					setErrors((prevErrors) => ({
						...prevErrors,
						...parsedValue.error.flatten().fieldErrors,
					}));
				}
			} catch (error) {
				console.error(`필드 '${name}' 유효성 검사 중 오류 발생:`, error);
			}
		},
		[schema],
	);

	return {
		errors,
		validateField,
	};
}
