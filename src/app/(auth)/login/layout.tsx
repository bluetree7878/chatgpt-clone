import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Askle AI - 로그인',
	description: 'Askle 로그인하고 AI와 자연스럽게 대화해보세요.',
};

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex items-center justify-center h-full'>{children}</div>
	);
}
