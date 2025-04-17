'use client';

import { useTheme } from '@/lib/theme';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			type='button'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			className='rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
			aria-label='테마 전환'
		>
			{theme === 'light' ? (
				<Moon className='h-5 w-5' />
			) : (
				<Sun className='h-5 w-5' />
			)}
		</button>
	);
}
