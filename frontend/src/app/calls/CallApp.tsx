'use client';

import { useCallback, useState } from 'react';
import CallList from './CallList';
import ConversationView from './ConversationView';
import { UserActivity } from '@/src/types/callTypes';

const CallApp = () => {
	// holds the currently selected user (null means list view)
	const [selectedUser, setSelectedUser] = useState<null | UserActivity>(null);

	const handleSelectUser = useCallback((user: UserActivity) => {
		setSelectedUser(user);
	}, []);

	const handleCloseConversation = useCallback(() => {
		setSelectedUser(null);
	}, []);

	return (
		<div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8 flex justify-center items-start">
			{/* Conditional Rendering based on selection */}
			{selectedUser ? (
				<ConversationView
					partner={selectedUser}
					onClose={handleCloseConversation}
				/>
			) : (
				<CallList onSelectUser={handleSelectUser} />
			)}

			{/* Scrollbar Styling for ConversationView */}
			<style>{`
                .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                background: #1f2937; /* Gray 800 */
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #4b5563; /* Gray 600 */
                border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #6b7280; /* Gray 500 */
                }
            `}</style>
		</div>
	);
};

export default CallApp;
