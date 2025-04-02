"use server";

import { getUserByEmail } from "@/data/user";
import { SignUpSchema } from "@/schemas/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signUp = async (_: any, formData: FormData) => {
  // 1. validate Field
  const validateFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errorMessage: "입력값이 올바르지 않습니다.",
    };
  }

  // 2. 존재하는 사용자인지 체크
  const { name, email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      errorMessage: "이미 존재하는 사용자 입니다.",
    };
  }
  // 3. insert db
  // 4. 성공/실패처리
};
