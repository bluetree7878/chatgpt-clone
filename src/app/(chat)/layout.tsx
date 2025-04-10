export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex flex-col h-full'>
			<div className='flex-1 overflow-hidden'>{children}</div>
		</div>
	);
}
