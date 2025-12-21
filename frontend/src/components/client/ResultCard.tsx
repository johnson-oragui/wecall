'use client';

import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface ResultCardProps {
	status: 'success' | 'error';
	message: string;
	onClose: () => void;
	path?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
	status,
	message,
	onClose,
	path,
}) => {
	const router = useRouter();

	useEffect(() => {
		const timer =
			status === 'success'
				? setTimeout(() => {
						onClose();
						router.push(path || '/signin');
				  }, 2500)
				: setTimeout(onClose, 4000);

		return () => clearTimeout(timer);
	}, [status, onClose, router, path]);

	return (
		<div className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div
				className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center animate-scaleIn
				${
					status === 'success'
						? 'bg-linear-to-br from-emerald-600 to-green-500'
						: 'bg-linear-to-br from-rose-600 to-red-500'
				}`}
			>
				<div className="flex justify-center mb-4">
					{status === 'success' ? (
						<CheckCircle className="h-16 w-16 text-white animate-bounce" />
					) : (
						<XCircle className="h-16 w-16 text-white animate-shake" />
					)}
				</div>

				<h3 className="text-xl font-extrabold text-white mb-2">
					{status === 'success' ? 'Account Created!' : 'Signup Failed'}
				</h3>

				<p className="text-white/90 text-sm leading-relaxed mb-4">{message}</p>

				<p className="text-xs text-white/70">
					{status === 'success'
						? 'Redirecting to Sign In...'
						: 'You can try again.'}
				</p>
			</div>
		</div>
	);
};

export default ResultCard;
