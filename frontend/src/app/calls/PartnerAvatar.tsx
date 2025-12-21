'use client';

const PartnerAvatar: React.FC<{ name: string }> = ({ name }) => {
	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
	return (
		<div className="h-8 w-8 rounded-full flex items-center justify-center bg-purple-600 text-white font-bold text-sm shrink-0">
			{initials}
		</div>
	);
};

export default PartnerAvatar;
