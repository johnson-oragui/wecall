import { UserActivity } from '@/src/types/callTypes';
import { Clock, MessageSquare, Mic, Signal, Video } from 'lucide-react';
import React from 'react';

// Maps activity type to an appropriate icon.

const ActivityIcon: React.FC<{ type: UserActivity['lastActivityType'] }> =
	React.memo(({ type }) => {
		const baseClasses = 'h-4 w-4 mr-1';
		switch (type) {
			case 'Video Call':
				return <Video className={`${baseClasses} text-indigo-400`} />;
			case 'Voice Call':
				return <Mic className={`${baseClasses} text-purple-400`} />;
			case 'Chat':
				return <MessageSquare className={`${baseClasses} text-yellow-400`} />;
			case 'Online':
				return <Signal className={`${baseClasses} text-green-400`} />;
			case 'Offline':
			default:
				return <Clock className={`${baseClasses} text-gray-500`} />;
		}
	});
ActivityIcon.displayName = 'ActivityIcon';

export default ActivityIcon;
