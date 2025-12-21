'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
	Video,
	MessageSquare,
	Phone,
	Send,
	MoreVertical,
	X,
} from 'lucide-react';
import ChatBubble from './ChatBubble';
import PartnerAvatar from './PartnerAvatar';
import VideoCallView from './VideoCallView';
import VoiceCallView from './VoiceCallView';
import {
	ConversationViewProps,
	InteractionType,
	MessageI,
} from '@/src/types/callTypes';

const ConversationView: React.FC<ConversationViewProps> = React.memo(
	({ partner, onClose }) => {
		const [messages, setMessages] = useState<MessageI[]>([
			{
				id: 1,
				sender: 'other',
				text: `Hey, I saw your last activity was a ${partner.lastActivityType}. Are you free?`,
				timestamp: '10:01 AM',
			},
			{
				id: 2,
				sender: 'user',
				text: "Yeah, totally! What's up?",
				timestamp: '10:02 AM',
			},
		]);
		const [newMessageText, setNewMessageText] = useState('');
		const [interactionType, setInteractionType] = useState<InteractionType>(
			partner.lastActivityType === 'Offline'
				? 'Chat'
				: partner.lastActivityType,
		);

		const messagesEndRef = useRef<HTMLDivElement>(null);

		// Scroll to the bottom of the chat list when messages update
		useEffect(() => {
			messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
		}, [messages]);

		const handleSendMessage = (e: { preventDefault: () => void }) => {
			e.preventDefault();
			if (newMessageText.trim() === '' || !messages) return;

			const newMsg: MessageI = {
				id: Date.now(),
				sender: 'user',
				text: newMessageText.trim(),
				timestamp: new Date().toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
				}),
			};

			setMessages((prev) => [...prev, newMsg]);
			setNewMessageText('');

			// Simulate partner response
			setTimeout(() => {
				const autoResponse: MessageI = {
					id: Date.now() + 1,
					sender: 'other',
					text: `(Auto-response from ${partner.name}): Roger that.`,
					timestamp: new Date().toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
					}),
				};
				setMessages((prev) => [...prev, autoResponse]);
			}, 1500);
		};

		const renderContent = () => {
			if (!messages)
				return (
					<div className="p-5 text-center text-gray-400">
						Loading conversation...
					</div>
				);

			switch (interactionType) {
				case 'Video Call':
					return <VideoCallView />;
				case 'Voice Call':
					return <VoiceCallView partnerName={partner.name as string} />;
				case 'Chat':
				case 'Online':
				case 'Offline':
				default:
					return (
						<div className="flex flex-col h-full bg-gray-800">
							{/* Messages Area */}
							<div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
								{messages.map((message) => (
									<ChatBubble key={message.id} message={message} />
								))}
								<div ref={messagesEndRef} /> {/* Scroll target */}
							</div>

							{/* Message Input */}
							<form
								onSubmit={handleSendMessage}
								className="p-4 border-t border-gray-700 bg-gray-900 flex items-center"
							>
								<input
									type="text"
									value={newMessageText}
									onChange={(e) => setNewMessageText(e.target.value)}
									placeholder="Type your message..."
									className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
								/>
								<button
									type="submit"
									className="ml-3 p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white shadow-md transform hover:scale-105 transition disabled:opacity-50"
									disabled={newMessageText.trim() === ''}
									aria-label="Send Message"
								>
									<Send className="h-5 w-5" />
								</button>
							</form>
						</div>
					);
			}
		};

		return (
			<div className="w-full max-w-3xl h-[80vh] bg-gray-900 rounded-xl shadow-2xl flex flex-col overflow-hidden">
				{/* Conversation Header */}
				<header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800 sticky top-0 z-20">
					<div className="flex items-center space-x-3">
						<PartnerAvatar name={partner.name as string} />
						<h2 className="text-xl font-semibold text-white">{partner.name}</h2>
						<span
							className={`text-xs px-2 py-0.5 rounded-full font-medium ${
								interactionType === 'Chat' ||
								interactionType === 'Online' ||
								interactionType === 'Offline'
									? 'bg-indigo-500/20 text-indigo-400'
									: interactionType === 'Video Call'
									? 'bg-red-500/20 text-red-400'
									: 'bg-purple-500/20 text-purple-400'
							}`}
						>
							{interactionType}
						</span>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center space-x-2">
						<button
							onClick={() => setInteractionType('Video Call')}
							className="p-2 text-white bg-green-600 hover:bg-green-700 rounded-full transition shadow-md"
							title="Start Video Call"
							aria-label="Start Video Call"
						>
							<Video className="h-5 w-5" />
						</button>
						<button
							onClick={() => setInteractionType('Voice Call')}
							className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition shadow-md"
							title="Start Voice Call"
							aria-label="Start Voice Call"
						>
							<Phone className="h-5 w-5" />
						</button>
						<button
							onClick={() => setInteractionType('Chat')}
							className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition shadow-md"
							title="Open Chat"
							aria-label="Open Chat"
						>
							<MessageSquare className="h-5 w-5" />
						</button>
						<button
							className="p-2 text-gray-400 hover:text-white transition"
							title="More Options"
							aria-label="More Options"
						>
							<MoreVertical className="h-5 w-5" />
						</button>
						<button
							onClick={onClose}
							className="p-2 text-red-400 hover:text-red-500 transition"
							title="Close Conversation"
							aria-label="Close Conversation"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
				</header>

				{/* Dynamic Content Area */}
				<div className="flex-1 min-h-0">{renderContent()}</div>
			</div>
		);
	},
);
ConversationView.displayName = 'ConversationView';

export default ConversationView;
