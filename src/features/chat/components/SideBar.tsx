'use client';

import { useState, type ReactNode } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Logo, LogoIcon } from './Logo';
import { UserAvatar } from './UserAvatar';
import { NavigationLinks } from './NavigationLinks';

interface SideBarProps {
	children: ReactNode;
}

export default function SideBar({ children }: SideBarProps) {
	const [open, setOpen] = useState(false);

	/**
	 * @todo 대화 목록 기능 추가
	 * - 사용자의 이전 대화 목록을 DB에서 불러와 표시
	 * - 대화 선택 기능 구현
	 * - 새 대화 시작 버튼 추가
	 * - 대화 이름 자동 생성 및 수정 기능
	 */
	return (
		<div
			className={cn(
				'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden',
				'h-screen',
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className='justify-between gap-10'>
					<div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
						{open ? <Logo /> : <LogoIcon />}
						<NavigationLinks />
					</div>
					<div>
						<UserAvatar />
					</div>
				</SidebarBody>
			</Sidebar>
			{children}
		</div>
	);
}
