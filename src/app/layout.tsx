import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Askle AI - 지능형 AI 챗봇',
	description:
		'Askle은 자연스럽고 스마트한 대화를 제공하는 AI 챗봇 서비스입니다.',
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					storageKey='askle-theme'
					disableTransitionOnChange
					enableColorScheme
				>
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
