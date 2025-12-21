export type InteractionType =
	| 'Chat'
	| 'Video Call'
	| 'Voice Call'
	| 'Offline'
	| 'Online';

export interface UserActivity {
	id: number;
	name: string;
	avatarUrl?: string;
	lastActivityType: InteractionType;
	time: string; // e.g., '10 min ago', 'Yesterday 5:30 PM'
}

export interface MessageI {
	id: number;
	sender: 'user' | 'other';
	text: string;
	timestamp: string;
}

export interface ConversationProps {
	partnerName: string;
	partnerAvatarUrl?: string;
	initialType: InteractionType;
	defaultProps: unknown;
}

export interface ConversationViewProps {
	onClose: () => void;
	partner: UserActivity;
}

export interface CallListProps {
	onSelectUser: (user: UserActivity) => void;
}

export interface VoiceCallViewProps {
	partnerName: string;
}
