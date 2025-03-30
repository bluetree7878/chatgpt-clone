import FormCard from "./FormCard";
import { Input } from "@/components/ui/input";
import Submit from "./Submit";

export default function SignUpForm() {
  return (
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으십니까?", href: "/login" }}
    >
      <form className="space-y-6">
        {/* 이름 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name">이름</label>
          <Input id="name" name="name" placeholder="이름을 입력해주세요." />
        </div>
        {/* 이메일 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="example@example.com"
          />
        </div>
        {/* 비밀번호 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />
        </div>
        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
}
