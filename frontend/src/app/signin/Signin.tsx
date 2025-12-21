'use client';

import React, { useState } from 'react';
import {
	User,
	Lock,
	Eye,
	EyeOff,
	Check,
	Loader2,
	Chrome as GoogleIcon,
	Github,
	Bookmark,
} from 'lucide-react';
import { FormData } from '@/src/types/signinTypes';
import ResultCard from '@/src/components/client/ResultCard';

const SignIn: React.FC = () => {
	const [result, setResult] = useState<{
		status: 'success' | 'error';
		message: string;
		path?: string;
	} | null>(null);
	const [formData, setFormData] = useState<FormData>({
		identifier: '',
		password: '',
		rememberMe: false,
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Simulate API call
		setTimeout(() => {
			console.log('Sign In Data:', formData);
			setLoading(false);
			// Success message or redirection logic here
		}, 1500);

		try {
			const response = await fetch('/api/v1/auth/signin', {
				method: 'POST',
				body: JSON.stringify({ ...formData, email: formData.identifier }),
			});

			const data = await response.json();

			if ([201, 200].includes(response.status)) {
				setLoading(false);
				await fetch('/api/v1/ws/notify', { method: 'POST' });
				localStorage.setItem(
					'userAuth',
					JSON.stringify({ ...data.data, tokens: undefined }),
				);
				setResult({
					status: 'success',
					message: data.message,
					path: '/calls',
				});
				return;
			}
		} catch (error) {
			setLoading(false);
			setResult({
				status: 'error',
				message: 'Something went wrong.',
			});
			console.error('Error signin user: ', error);
			return;
		}
	};

	const handleSocialLogin = (provider: 'google' | 'github') => {
		console.log(`Logging in with ${provider}`);
	};

	const PasswordIcon = passwordVisible ? EyeOff : Eye;

	const inputClasses =
		'w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out';
	const iconClasses =
		'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400';

	return (
		<div className="min-h-screen flex items-center justify-center  p-4">
			<div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10">
				<h2 className="text-3xl font-extrabold text-white text-center mb-6">
					Welcome Back
				</h2>
				<p className="text-center text-gray-400 mb-8">
					Sign in to continue your journey.
				</p>

				{/* Social Login Buttons */}
				<div className="flex flex-col space-y-4 mb-8">
					<button
						onClick={() => handleSocialLogin('google')}
						className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
						disabled={loading}
					>
						<GoogleIcon className="mr-3 h-5 w-5" /> Sign In with Google
					</button>
					<button
						onClick={() => handleSocialLogin('github')}
						className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
						disabled={loading}
					>
						<Github className="mr-3 h-5 w-5" />
						Sign In with GitHub
					</button>
				</div>

				<div className="flex items-center mb-8">
					<div className="grow border-t border-gray-600"></div>
					<span className="shrink mx-4 text-gray-500 text-sm font-medium">
						OR
					</span>
					<div className="grow border-t border-gray-600"></div>
				</div>

				{/* Sign In Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Email or Username Input */}
					<div className="relative">
						<User className={iconClasses} />
						<input
							type="email"
							name="identifier"
							placeholder="Email or Username"
							value={formData.identifier}
							onChange={handleChange}
							required
							className={inputClasses}
						/>
					</div>

					{/* Password Input */}
					<div className="relative">
						<Lock className={iconClasses} />
						<input
							type={passwordVisible ? 'text' : 'password'}
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							required
							className={inputClasses}
						/>
						<button
							type="button"
							onClick={() => setPasswordVisible(!passwordVisible)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
							aria-label={passwordVisible ? 'Hide password' : 'Show password'}
						>
							<PasswordIcon className="h-5 w-5" />
						</button>
					</div>

					{/* Remember Me & Forgot Password */}
					<div className="flex items-center justify-between pt-2">
						{/* Remember Me Checkbox */}
						<div className="flex items-center">
							<input
								id="rememberMe"
								name="rememberMe"
								type="checkbox"
								checked={formData.rememberMe}
								onChange={handleChange}
								className="h-5 w-5 text-indigo-500 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700 cursor-pointer"
							/>
							<label
								htmlFor="rememberMe"
								className="ml-3 text-sm text-gray-400"
							>
								<Bookmark className="inline h-4 w-4 mr-1 text-indigo-400" />
								Remember Me
							</label>
						</div>

						{/* Forgot Password Link */}
						<a
							href="/forgot-password"
							className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition duration-150"
						>
							Forgot Password?
						</a>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-lg disabled:opacity-50 mt-6"
						disabled={loading}
					>
						{loading ? (
							<Loader2 className="animate-spin h-5 w-5 mr-3" />
						) : (
							<Check className="h-5 w-5 mr-2" />
						)}
						{loading ? 'Authenticating...' : 'Sign In'}
					</button>
				</form>

				<p className="text-center text-sm text-gray-400 mt-6">
					Don&apos;t have an account yet?
					<a
						href="/signup"
						className="font-medium text-indigo-400 hover:text-indigo-300 ml-1 transition duration-150"
					>
						Sign Up
					</a>
				</p>
			</div>
			{result && (
				<ResultCard
					status={result.status}
					message={result.message}
					onClose={() => setResult(null)}
					path={result.path}
				/>
			)}
		</div>
	);
};

export default SignIn;
