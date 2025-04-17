import { cn } from '@/lib/utils';
import type { Message } from '@/features/chat/types';
import { formatTime } from '@/utils/formatTime';

interface ChatMessageProps {
	message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
	const isUser = message.role === 'user';

	return (
		<div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
			<div
				className={cn(
					'max-w-[80%] rounded-lg px-4 py-2',
					isUser
						? 'bg-blue-600 text-white'
						: 'bg-neutral-100 dark:bg-neutral-800 dark:text-white',
				)}
			>
				<p>{message.content}</p>
				<div className='text-xs opacity-70 mt-1'>
					{formatTime(message.createdAt)}
				</div>
			</div>
		</div>
	);
}
