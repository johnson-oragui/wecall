import { MessageI } from '@/src/types/callTypes';

const ChatBubble: React.FC<{ message: MessageI }> = ({ message }) => {
	const isUser = message.sender === 'user';
	const bubbleClasses = isUser
		? 'bg-indigo-600 text-white rounded-br-none self-end'
		: 'bg-gray-700 text-gray-100 rounded-tl-none self-start';
	const containerClasses = isUser ? 'flex justify-end' : 'flex justify-start';

	return (
		<div className={`my-2 ${containerClasses}`}>
			<div
				className={`max-w-xs sm:max-w-md px-4 py-3 rounded-xl shadow-lg ${bubbleClasses}`}
			>
				<p className="text-sm">{message.text}</p>
				<span
					className={`text-xs mt-1 block ${
						isUser ? 'text-indigo-200' : 'text-gray-400'
					} text-right`}
				>
					{message.timestamp}
				</span>
			</div>
		</div>
	);
};

export default ChatBubble;
