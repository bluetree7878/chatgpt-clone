import ChatBox from '@/features/chat/components/ChatBox';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function ChatPage() {
	return (
		<div className='flex flex-col p-2 md:p-6 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex-1 w-full h-full'>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl font-bold'>Askle AI</h1>
				<ThemeToggle />
			</div>
			<div className='flex-1 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden'>
				<ChatBox />
			</div>
		</div>
	);
}
