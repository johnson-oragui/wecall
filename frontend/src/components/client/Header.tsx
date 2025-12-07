'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { HeaderProps } from '@/src/types/headerTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header: React.FC<HeaderProps> = ({
	appName = 'WeChat',
	navItems = [],
	userEmail,
}) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [currentPath, setCurrentPath] = useState('/');
	const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
	const [isDesktopUserMenuOpen, setIsDesktopUserMenuOpen] = useState(false);
	const router = useRouter();

	const handleLogin = () => {
		router.push('/signin');
	};

	const handleSignout = () => {
		console.log('Desktop user signed out');
		setIsDesktopUserMenuOpen(false);
	};

	// get the current path using standard React hooks after mounting
	useEffect(() => {
		async function Setter() {
			// Check if window/browser environment is available
			if (typeof window !== 'undefined') {
				await setCurrentPath(window.location.pathname);
			}
		}
		Setter();
	}, []);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		// Ensure user menu is closed when main menu is toggled
		if (isMobileUserMenuOpen) {
			setIsMobileUserMenuOpen(false);
		}
		if (isDesktopUserMenuOpen) {
			setIsDesktopUserMenuOpen(false);
		}
	};

	const toggleMobileUserMenu = () => {
		setIsMobileUserMenuOpen(!isMobileUserMenuOpen);
	};

	const toggleDesktopUserMenu = () => {
		setIsDesktopUserMenuOpen(!isDesktopUserMenuOpen);
	};

	return (
		<header className="sticky top-0 z-50 bg-gray-900 shadow-xl border-b border-gray-700">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo/App Name */}
					<div className="flex items-center space-x-2 shrink-0">
						<Link
							href="/"
							className="text-2xl font-extrabold text-indigo-400 tracking-wider hover:text-indigo-300 transition duration-300"
						>
							<Image
								src="https://res.cloudinary.com/ddqj8ejpa/image/upload/v1758814364/samples/zoom.avif"
								alt="App Logo"
								width={32}
								height={32}
								className="rounded-md"
							/>
						</Link>

						<Link
							href="/"
							className="text-2xl font-extrabold text-indigo-400 tracking-wider hover:text-indigo-300 transition duration-300"
						>
							{appName}
						</Link>
					</div>

					{/* Navigation */}
					<div className="flex items-center">
						{/* Desktop Navigation Links */}
						<nav className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-4">
								{navItems.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition duration-200
                      ${
												currentPath === item.href
													? 'bg-indigo-600 text-white shadow-md'
													: 'text-gray-300 hover:bg-gray-700 hover:text-white'
											}
                    `}
										aria-current={
											currentPath === item.href ? 'page' : undefined
										}
									>
										{item.name}
									</a>
								))}
							</div>
						</nav>

						{/* User Status (Desktop) */}
						<div className="hidden md:block ml-6">
							{userEmail ? (
								<div className="relative">
									<button
										onClick={toggleDesktopUserMenu}
										className="flex items-center text-sm font-medium text-indigo-200 bg-gray-700 py-1.5 pl-3 pr-2 rounded-full transition duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
									>
										<span className="truncate max-w-[120px]">{userEmail}</span>
										{isDesktopUserMenuOpen ? (
											<ChevronUp className="h-5 w-5 ml-1" />
										) : (
											<ChevronDown className="h-5 w-5 ml-1" />
										)}
									</button>

									{/* Dropdown Menu for Profile and Sign Out */}
									{isDesktopUserMenuOpen && (
										<div
											className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="user-menu-button"
										>
											<a
												href="/profile"
												className="block px-4 py-2 text-sm text-gray-200 hover:bg-indigo-600 hover:text-white rounded-t-lg transition duration-150"
												role="menuitem"
												onClick={() => setIsDesktopUserMenuOpen(false)}
											>
												Profile
											</a>
											<button
												onClick={handleSignout}
												className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-700 hover:text-white rounded-b-lg transition duration-150"
												role="menuitem"
											>
												Sign Out
											</button>
										</div>
									)}
								</div>
							) : (
								<button
									className="text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition duration-200 shadow-md"
									onClick={handleLogin}
								>
									Sign In
								</button>
							)}
						</div>

						{/* Mobile Menu Button */}
						<div className="md:hidden ml-4">
							<button
								onClick={toggleMobileMenu}
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition duration-150"
								aria-controls="mobile-menu"
								aria-expanded={isMobileMenuOpen}
							>
								<span className="sr-only">Open main menu</span>
								{/* Toggle Icon between Menu (burger) and X (close) */}
								{isMobileMenuOpen ? (
									<X className="block h-6 w-6" aria-hidden="true" />
								) : (
									<Menu className="block h-6 w-6" aria-hidden="true" />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Menu Panel */}
			{isMobileMenuOpen && (
				<div
					className="md:hidden bg-gray-800 py-2 shadow-inner"
					id="mobile-menu"
				>
					{/* Mobile User Status */}
					<div className="border-t border-gray-700 pt-4 pb-3 px-3">
						{userEmail ? (
							<div className="relative">
								<button
									onClick={toggleMobileUserMenu}
									className="w-full flex justify-between items-center text-left py-2 px-3 rounded-lg text-sm font-medium text-indigo-200 bg-gray-700 hover:bg-gray-600 transition duration-200"
								>
									<span className="truncate pr-2">
										Signed in as: {userEmail}
									</span>
									{isMobileUserMenuOpen ? (
										<ChevronUp className="h-5 w-5" />
									) : (
										<ChevronDown className="h-5 w-5" />
									)}
								</button>

								{/* Dropdown Menu for Profile and Sign Out */}
								{isMobileUserMenuOpen && (
									<div className="mt-1 space-y-1 bg-gray-700 rounded-lg shadow-lg overflow-hidden">
										<a
											href="/profile" // Link to the user's profile page
											className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-indigo-600 hover:text-white transition duration-150"
											onClick={() => setIsMobileMenuOpen(false)} // Close main menu on click
										>
											Profile
										</a>
										<button
											onClick={handleSignout}
											className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-700 hover:text-white transition duration-150"
										>
											Sign Out
										</button>
									</div>
								)}
							</div>
						) : (
							<button
								className="w-full text-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition duration-200 shadow"
								onClick={handleLogin}
							>
								Sign In
							</button>
						)}
					</div>

					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
						{/* Navigation Links */}
						{navItems.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className={`
                    block px-3 py-2 rounded-md text-base font-medium transition duration-200
                    ${
											currentPath === item.href
												? 'bg-indigo-700 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white'
										}
                  `}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{item.name}
							</a>
						))}
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
