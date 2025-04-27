'use client';

import type { ReactNode } from 'react';
import { SidebarLink } from '@/components/ui/sidebar';
import { LayoutDashboard, UserCog, Settings, LogOut } from 'lucide-react';
import { deleteToken } from '@/features/auth/services/token';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface NavLink {
	label: string;
	href: string;
	icon: ReactNode;
	onClick?: () => Promise<void>;
}

export const NavigationLinks = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await deleteToken();
			router.push('/login');
			toast.success('로그아웃 되었습니다.');
		} catch (error) {
			console.error('로그아웃 실패:', error);
			toast.error('로그아웃 중 오류가 발생했습니다.');
		}
	};

	const links: NavLink[] = [
		{
			label: 'Dashboard',
			href: '#',
			icon: (
				<LayoutDashboard className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: 'Profile',
			href: '#',
			icon: (
				<UserCog className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: 'Settings',
			href: '#',
			icon: (
				<Settings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: 'Logout',
			href: '#',
			icon: (
				<LogOut className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
			onClick: handleLogout,
		},
	];

	return (
		<div className='mt-8 flex flex-col gap-2'>
			{links.map((link) => (
				<SidebarLink key={link.label} link={link} />
			))}
		</div>
	);
};
