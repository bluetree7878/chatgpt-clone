'use client';

import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ChatMessage from './ChatMessage';
import type { Message } from '@/features/chat/types';
import { cn } from '@/lib/utils';

export default function ChatBox() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			content: '안녕하세요! 무엇을 도와드릴까요?',
			role: 'assistant',
			createdAt: new Date(),
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!input.trim() || isLoading) return;

		// 사용자 메시지 추가
		const userMessage: Message = {
			id: Date.now().toString(),
			content: input,
			role: 'user',
			createdAt: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput('');
		setIsLoading(true);

		try {
			/**
			 * @todo AI 응답을 위한 코드 추가 예정 (일단 더미 데이터 사용)
			 */
			setTimeout(() => {
				const assistantMessage: Message = {
					id: (Date.now() + 1).toString(),
					content: `"${input}"에 대한 답변입니다. 더 자세한 정보가 필요하시면 말씀해주세요.`,
					role: 'assistant',
					createdAt: new Date(),
				};

				setMessages((prev) => [...prev, assistantMessage]);
				setIsLoading(false);
			}, 1000);
		} catch (error) {
			console.error('Error:', error);
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			if (!isLoading && input.trim()) {
				e.preventDefault();
				handleSubmit(e);
			}
		}
	};

	return (
		<div className='flex flex-col h-full'>
			{/* 채팅 메시지 영역 */}
			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}
				{isLoading && (
					<div className='text-center text-sm'>AI가 응답을 생성하는 중...</div>
				)}
			</div>

			{/* 입력 영역 */}
			<form
				onSubmit={handleSubmit}
				className='border-t p-4 dark:border-neutral-800'
			>
				<div className='flex gap-2'>
					<TextareaAutosize
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='메시지를 입력하세요...'
						className={cn(
							'flex-1 resize-none border rounded-md p-2',
							'focus:outline-none focus:ring-2 focus:ring-neutral-400',
							'dark:bg-neutral-800 dark:border-neutral-700 dark:text-white',
							'min-h-[40px] max-h-[200px]',
						)}
						disabled={isLoading}
						minRows={1}
						maxRows={6}
					/>
					<Button type='submit' disabled={isLoading || !input.trim()}>
						<Send className='h-4 w-4' />
					</Button>
				</div>
			</form>
		</div>
	);
}
