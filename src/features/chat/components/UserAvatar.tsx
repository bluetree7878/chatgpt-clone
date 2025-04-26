'use client';

import Image from 'next/image';
import { SidebarLink } from '@/components/ui/sidebar';

export const UserAvatar = () => {
	/**
	 * @todo 사용자 프로필 기능 개선
	 * - 현재 로그인한 사용자 정보 표시
	 * - 프로필 이미지 업로드 기능
	 * - 프로필 수정 페이지 연결
	 * - 사용자 설정 드롭다운 메뉴 추가
	 */
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
