import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Askle AI - 회원가입',
  description: 'Askle에 가입하고 지능형 AI 챗봇과 대화를 시작하세요.',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}
