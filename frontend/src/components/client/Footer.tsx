'use client';

import React from 'react';

import { FooterProps } from '@/src/types/footerTypes';
import { socialLinks as sLinks } from '@/src/staticData/footerData';

const Footer: React.FC<FooterProps> = ({ quickLinks, socialLinks }) => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 border-t border-gray-700 mt-12 py-8">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row md:justify-between items-center md:items-start space-y-6 md:space-y-0">
					{/* Copyright and App Name */}
					<div className="text-center md:text-left">
						<p className="text-lg font-bold text-indigo-400">WeCall</p>
						<p className="mt-1 text-sm text-gray-400">
							&copy; {currentYear} WeCall. All rights reserved.
						</p>
					</div>

					{/* Quick Links */}
					<div className="flex flex-wrap justify-center md:justify-start space-x-6">
						{quickLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className="text-sm font-medium text-gray-400 hover:text-indigo-400 transition duration-150"
							>
								{link.name}
							</a>
						))}
					</div>

					{/* Social Media Icons */}
					<div className="flex space-x-6 justify-center md:justify-end">
						{(socialLinks || sLinks).map((link) => (
							<a
								key={link.name}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.name}
								className="text-gray-400 hover:text-indigo-400 transition duration-150"
							>
								<link.icon className="h-6 w-6" aria-hidden="true" />
							</a>
						))}
					</div>
				</div>

				{/* Divider/Bottom Text */}
				<div className="mt-8 pt-6 border-t border-gray-800 text-center">
					<p className="text-xs text-gray-500">
						Built with Next.js, TypeScript, and Tailwind CSS.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
