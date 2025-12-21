import { UserActivity } from '@/src/types/callTypes';

export default class CallUtil {
	static generateDummyUsers(count: number): UserActivity[] {
		const activities = [
			'Video Call',
			'Voice Call',
			'Chat',
			'Online',
			'Offline',
		] as const;
		const users: UserActivity[] = [];

		for (let i = 1; i <= count; i++) {
			const activityIndex = i % activities.length;
			const activity = activities[activityIndex];

			const firstNames = [
				'Alan',
				'Beth',
				'Carlos',
				'Denise',
				'Ethan',
				'Fiona',
				'George',
				'Helen',
				'Ivan',
				'Julia',
				'Kyle',
				'Laura',
			];
			const lastNames = [
				'Smith',
				'Jones',
				'Miller',
				'Davis',
				'Garcia',
				'Rodriguez',
				'Wilson',
				'Martinez',
				'Anderson',
				'Taylor',
				'Thomas',
			];

			const firstName =
				firstNames[Math.floor(Math.random() * firstNames.length)];
			const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
			const name = `${firstName} ${lastName} (${i})`;

			users.push({
				id: i,
				name: name,
				lastActivityType: activity,
				time:
					i % 3 === 0
						? `${(i % 5) + 1} min ago`
						: i % 3 === 1
						? `${(i % 10) + 2} hours ago`
						: `Yesterday`,
			});
		}
		return users;
	}
}
