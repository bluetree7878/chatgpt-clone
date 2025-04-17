'use client';

import Image from 'next/image';
import { SidebarLink } from '@/components/ui/sidebar';

export const UserAvatar = () => {
	return (
		<SidebarLink
			link={{
				label: 'Manu Arora',
				href: '#',
				icon: (
					<Image
						src='https://assets.aceternity.com/manu.png'
						className='h-7 w-7 flex-shrink-0 rounded-full'
						width={50}
						height={50}
						alt='Avatar'
					/>
				),
			}}
		/>
	);
};
