'use client';

import { UserActivity } from '@/src/types/callTypes';
import React from 'react';

// Renders the user's avatar using their initials.

const Avatar: React.FC<{ user: UserActivity }> = React.memo(({ user }) => {
	const initials = user.name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
	const colorClasses = user.id % 2 === 0 ? 'bg-indigo-600' : 'bg-purple-600';

	return (
		<div className="relative shrink-0">
			{/* uses initials-based avatar */}
			<div
				className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${colorClasses}`}
			>
				{initials}
			</div>
			{/* Online/Offline Status Indicator */}
			{user.lastActivityType === 'Online' && (
				<span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-gray-800 bg-green-400"></span>
			)}
		</div>
	);
});
Avatar.displayName = 'Avatar';

export default Avatar;
