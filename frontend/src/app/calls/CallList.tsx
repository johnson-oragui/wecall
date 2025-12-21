'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Phone, Loader2 } from 'lucide-react';
import Avatar from './Avatar';
import ActivityIcon from './ActivityIcon';
import { CallListProps, UserActivity } from '@/src/types/callTypes';

const USERS_PER_PAGE = 6;

const CallList: React.FC<CallListProps> = React.memo(({ onSelectUser }) => {
	const [allUsers, setAllUsers] = useState<UserActivity[]>([]);
	const [displayedUsers, setDisplayedUsers] = useState<UserActivity[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			const res = await fetch('/api/v1/users');
			const data = await res.json();
			const users = data.data;
			setAllUsers(users);
			const slicedusers = users.slice(0, USERS_PER_PAGE);
			setDisplayedUsers(slicedusers);
			setHasMore(displayedUsers.length < users.length);
		};
		getUsers();
	}, []);
	const listRef = React.useRef<HTMLUListElement>(null);

	const loadMoreUsers = useCallback(() => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);

		// Simulate backend fetch delay
		setTimeout(() => {
			const currentLength = displayedUsers.length;
			const nextBatch = allUsers.slice(
				currentLength,
				currentLength + USERS_PER_PAGE,
			);

			setDisplayedUsers((prev) => [...prev, ...nextBatch]);
			setIsLoading(false);

			if (currentLength + nextBatch.length >= allUsers.length) {
				setHasMore(false);
			}
		}, 1000); // 1 second delay simulation
	}, [isLoading, hasMore, allUsers, displayedUsers.length]);

	// set up the scroll listener
	useEffect(() => {
		const listElement = listRef.current;
		if (!listElement) return;

		const handleScroll = () => {
			const isNearBottom =
				listElement.scrollTop + listElement.clientHeight >=
				listElement.scrollHeight - 100;

			if (isNearBottom && hasMore && !isLoading) {
				loadMoreUsers();
			}
		};

		listElement.addEventListener('scroll', handleScroll);

		return () => {
			listElement.removeEventListener('scroll', handleScroll);
		};
	}, [hasMore, isLoading, loadMoreUsers]);

	const totalUsers = useMemo(() => allUsers.length, [allUsers.length]);

	return (
		<div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-2xl h-[80vh] flex flex-col">
			{/* Header */}
			<header className="p-5 border-b border-gray-700 bg-gray-900 shrink-0">
				<h2 className="text-2xl font-bold text-white flex items-center">
					<Phone className="h-6 w-6 mr-3 text-indigo-400" />
					Friend Activity ({displayedUsers.length} / {totalUsers})
				</h2>
			</header>

			{/* Scrollable List Container */}
			<ul
				ref={listRef}
				role="list"
				className="flex-1 overflow-y-auto divide-y divide-gray-700"
			>
				{displayedUsers.map((user, idx) => (
					<li
						key={idx}
						onClick={() => onSelectUser(user)}
						className="p-4 sm:p-6 hover:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
					>
						<div className="flex items-center space-x-4">
							{/* Avatar */}
							<Avatar user={user} />

							{/* Name and Activity */}
							<div className="flex-1 min-w-0">
								<p className="text-lg font-semibold text-white truncate">
									{user.name}
								</p>
								<div className="flex items-center text-sm text-gray-400 mt-1">
									<ActivityIcon type={user.lastActivityType} />
									<span className="truncate">{user.lastActivityType}</span>
								</div>
							</div>

							{/* Time Stamp */}
							<div className="text-right shrink-0">
								<p className="text-sm font-medium text-gray-400">{user.time}</p>
							</div>

							{/* Quick Call Button */}
							{/* Stop propagation to prevent selecting the user when clicking the button */}
							<button
								onClick={(e) => {
									e.stopPropagation();
									// Default behavior for quick call can be opening a Voice Call view
									onSelectUser({ ...user, lastActivityType: 'Voice Call' });
								}}
								className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out shadow-lg transform hover:scale-110"
								aria-label={`Quick call ${user.name}`}
							>
								<Phone className="h-5 w-5 text-white" />
							</button>
						</div>
					</li>
				))}

				{/* Loading Indicator */}
				{isLoading && (
					<li className="p-4 sm:p-6 text-center text-white flex justify-center items-center">
						<Loader2 className="animate-spin h-5 w-5 mr-3 text-indigo-400" />
						Loading more users...
					</li>
				)}

				{/* End of List Message */}
				{!hasMore && (
					<li className="p-4 sm:p-6 text-center text-sm text-gray-500">
						You&apos;ve reached the end of your friend list.
					</li>
				)}
			</ul>

			{/* Footer for context */}
			<footer className="p-5 border-t border-gray-700 text-center text-sm text-gray-500 bg-gray-800 sticky bottom-0 z-10">
				Showing {displayedUsers.length} of {totalUsers} total connections.
			</footer>
		</div>
	);
});
CallList.displayName = 'CallList';

export default CallList;
