export type MessageRole = 'user' | 'assistant';

export interface Message {
	id: string;
	content: string;
	role: MessageRole;
	createdAt: Date;
}

export interface Conversation {
	id: string;
	name: string;
	messages: Message[];
	createdAt: Date;
	updatedAt: Date;
}
