'use client';

import type { ReactNode } from 'react';
import { SidebarLink } from '@/components/ui/sidebar';
import { LayoutDashboard, UserCog, Settings, LogOut } from 'lucide-react';

interface NavLink {
	label: string;
	href: string;
	icon: ReactNode;
}

export const NavigationLinks = () => {
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
