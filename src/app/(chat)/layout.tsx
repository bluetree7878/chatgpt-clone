import Sidebar from '@/features/chat/components/SideBar';

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Sidebar>{children}</Sidebar>;
}
