'use client';

import React, { useState } from 'react';
import {
	Mail,
	User,
	Lock,
	Eye,
	EyeOff,
	Check,
	Loader2,
	Chrome as GoogleIcon,
	Github,
	Phone,
} from 'lucide-react';
import { countryCodes } from '@/src/staticData/signupData';
import { FormData } from '@/src/types/signupTypes';
import SignupUtil from './signupUtil';

const SignUp: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		countryCode: '+1',
		phoneNumber: '',
		agreedToTerms: false,
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [phoneError, setPhoneError] = useState('');

	const passMessage = SignupUtil.validatePassword(formData.password);
	const emailMessage = SignupUtil.validateEmail(formData.email);
	const usernameMessage = SignupUtil.validateUsername(formData.username);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow digits
		setFormData((prev) => ({
			...prev,
			phoneNumber: value,
		}));
		setPhoneError('');
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setPhoneError('');

		if (!formData.agreedToTerms) {
			console.error('Must agree to Terms');
			setLoading(false);
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			console.error('Passwords do not match.');
			setLoading(false);
			return;
		}
		if (emailMessage !== '' || formData.email === '') {
			console.error(emailMessage || 'Email address is required');
			setLoading(false);
			return;
		}

		if (formData.phoneNumber && formData.phoneNumber.length < 5) {
			setPhoneError('Please enter a valid phone number (min 5 digits).');
			setLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			console.log('Sign Up Data:', {
				...formData,
				...(formData.phoneNumber.trim() !== '' && {
					phoneNumber: formData.countryCode + formData.phoneNumber,
				}),
			});
			setLoading(false);
			// Success message or redirection logic here
		}, 2000);
	};

	const handleSocialLogin = (provider: 'google' | 'github') => {
		console.log(`Logging in with ${provider}`);
	};

	const PasswordIcon = passwordVisible ? EyeOff : Eye;
	const ConfirmPasswordIcon = confirmPasswordVisible ? EyeOff : Eye;

	const inputClasses =
		'w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out';
	const iconClasses =
		'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400';

	return (
		<div className="min-h-screen flex items-center justify-center bg-white p-4">
			<div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10">
				<h2 className="text-3xl font-extrabold text-white text-center mb-6">
					Create Your Account
				</h2>
				<p className="text-center text-gray-400 mb-8">
					Start your journey with us today.
				</p>

				{/* Social Login Buttons */}
				<div className="flex flex-col space-y-4 mb-8">
					<button
						onClick={() => handleSocialLogin('google')}
						className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
						disabled={loading}
					>
						<GoogleIcon className="mr-3 h-5 w-5" /> Continue with Google
					</button>
					<button
						onClick={() => handleSocialLogin('github')}
						className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
						disabled={loading}
					>
						<Github className="mr-3 h-5 w-5" />
						Continue with GitHub
					</button>
				</div>

				<div className="flex items-center mb-8">
					<div className="grow border-t border-gray-600"></div>
					<span className="shrink mx-4 text-gray-500 text-sm font-medium">
						OR
					</span>
					<div className="grow border-t border-gray-600"></div>
				</div>

				{/* Sign Up Form */}
				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Email Input */}
					<div className="relative">
						<Mail className={iconClasses} />
						<input
							type="email"
							name="email"
							placeholder="Email Address *"
							value={formData.email}
							onChange={handleChange}
							required
							className={inputClasses}
						/>
						{emailMessage !== '' && (
							<p className="text-red-400 text-xs mt-1 absolute -bottom-5">
								{emailMessage}.
							</p>
						)}
					</div>

					{/* Username Input (Optional) */}
					<div className="relative">
						<User className={iconClasses} />
						<input
							type="text"
							name="username"
							placeholder="Username (Optional)"
							value={formData.username}
							onChange={handleChange}
							className={inputClasses}
						/>
						{usernameMessage !== '' && (
							<p className="text-red-400 text-xs mt-1 absolute -bottom-5">
								{usernameMessage}.
							</p>
						)}
					</div>

					{/* Password Input */}
					<div className="relative">
						<Lock className={iconClasses} />
						<input
							type={passwordVisible ? 'text' : 'password'}
							name="password"
							placeholder="Password *"
							value={formData.password}
							onChange={handleChange}
							required
							minLength={8}
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
						{passMessage !== '' && (
							<p className="text-red-400 text-xs mt-1 absolute -bottom-5">
								{passMessage}.
							</p>
						)}
					</div>

					{/* Confirm Password Input */}
					<div className="relative">
						<Lock className={iconClasses} />
						<input
							type={confirmPasswordVisible ? 'text' : 'password'}
							name="confirmPassword"
							placeholder="Confirm Password *"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							minLength={8}
							className={inputClasses}
						/>
						<button
							type="button"
							onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
							aria-label={
								confirmPasswordVisible ? 'Hide password' : 'Show password'
							}
						>
							<ConfirmPasswordIcon className="h-5 w-5" />
						</button>
						{formData.password &&
							formData.confirmPassword &&
							formData.password !== formData.confirmPassword && (
								<p className="text-red-400 text-xs mt-1 absolute -bottom-5">
									Passwords do not match.
								</p>
							)}
					</div>

					{/* Phone Number Input (Optional) */}
					<div className="pt-3">
						<label className="text-sm font-medium text-gray-400 block mb-1">
							Phone Number (Optional)
						</label>
						<div className="flex rounded-lg border border-gray-600 bg-gray-700 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition duration-150 ease-in-out">
							{/* Country Code Dropdown */}
							<div className="relative flex items-center">
								<Phone className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
								<select
									name="countryCode"
									value={formData.countryCode}
									onChange={handleChange}
									className="py-3 pl-10 pr-4 bg-gray-700 rounded-l-lg text-white border-r border-gray-600 focus:outline-none focus:ring-0 appearance-none cursor-pointer text-sm"
								>
									{countryCodes.map((country) => (
										<option key={country.code} value={country.code}>
											{country.code} ({country.name})
										</option>
									))}
								</select>
							</div>

							{/* Phone Number Input */}
							<input
								type="tel"
								name="phoneNumber"
								placeholder="Enter phone number"
								value={formData.phoneNumber}
								onChange={handlePhoneChange}
								className="grow p-3 bg-gray-700 rounded-r-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition duration-150"
							/>
						</div>
						{phoneError && (
							<p className="text-red-400 text-xs mt-2">{phoneError}</p>
						)}
					</div>

					{/* Terms Checkbox */}
					<div className="flex items-center pt-3">
						<input
							id="agreedToTerms"
							name="agreedToTerms"
							type="checkbox"
							checked={formData.agreedToTerms}
							onChange={handleTermsChange}
							required
							className="h-5 w-5 text-indigo-500 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700 cursor-pointer"
						/>
						<label
							htmlFor="agreedToTerms"
							className="ml-3 text-sm text-gray-400"
						>
							I agree to the
							<a
								href="/terms"
								target="_blank"
								className="font-medium text-indigo-400 hover:text-indigo-300 ml-1 transition duration-150"
							>
								Terms and Conditions
							</a>
							.
						</label>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-lg disabled:opacity-50 mt-6"
						disabled={
							loading ||
							!formData.agreedToTerms ||
							formData.password !== formData.confirmPassword ||
							(formData.phoneNumber !== '' && phoneError !== '')
						}
					>
						{loading ? (
							<Loader2 className="animate-spin h-5 w-5 mr-3" />
						) : (
							<Check className="h-5 w-5 mr-2" />
						)}
						{loading ? 'Processing...' : 'Sign Up'}
					</button>
				</form>

				<p className="text-center text-sm text-gray-400 mt-6">
					Already have an account?
					<a
						href="/signin"
						className="font-medium text-indigo-400 hover:text-indigo-300 ml-1 transition duration-150"
					>
						Sign In
					</a>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
