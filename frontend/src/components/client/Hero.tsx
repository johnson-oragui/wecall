'use client';

import React from 'react';
import { Video, MessageSquare, Compass } from 'lucide-react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
	return (
		<section className="relative h-screen bg-gray-900 text-white overflow-hidden py-16 sm:py-24 lg:py-32">
			<div className="absolute inset-0 z-0 opacity-10">
				<div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
					<div className="lg:col-span-7 text-center lg:text-left mb-12 lg:mb-0">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
							Connect. Discover. Chat. <br className="hidden md:inline" />
							<span className="text-indigo-400">
								Your Universe of Conversations.
							</span>
						</h1>
						<p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
							Experience crystal-clear video calls, seamless voice chats, and
							instant messaging with friends. Plus, dive into the exciting{' '}
							<strong className="text-indigo-300">Discover Mode</strong> to
							connect with new people around the globe!
						</p>

						<div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
							<a
								href="/signup"
								className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 animate-pulse-subtle" // ADDED animate-pulse-subtle
							>
								Get Started Free
							</a>
							<a
								href="/discover"
								className="inline-flex items-center px-8 py-4 border border-indigo-400 text-base font-bold rounded-full text-indigo-300 bg-transparent hover:bg-indigo-900 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
							>
								<Compass className="h-5 w-5 mr-2" />
								Explore Discover Mode
							</a>
						</div>
					</div>

					<div className="lg:col-span-5 relative flex justify-center items-center">
						{/* Main Hero Image */}

						<div className="relative w-full max-w-md aspect-video bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 p-4">
							<Image
								src="https://placehold.co/800x450/1e293b/a5b4fc?text=Dynamic+Conversations"
								alt="Dynamic Conversations Interface"
								className="w-full h-full object-cover rounded-2xl"
								width={180}
								height={90}
								unoptimized
							/>
							<div className="absolute top-4 left-4 flex items-center space-x-2 p-2 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full shadow-md text-sm font-semibold animate-float-up-down">
								{' '}
								<Video className="h-5 w-5" /> <span>Video Calls</span>
							</div>
							<div className="absolute bottom-4 right-4 flex items-center space-x-2 p-2 bg-linear-to-r from-pink-500 to-red-600 rounded-full shadow-md text-sm font-semibold animate-float-up-down animation-delay-1500">
								{' '}
								<MessageSquare className="h-5 w-5" />{' '}
								<span>Real-time Chat</span>
							</div>
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-white text-gray-900 rounded-full shadow-xl">
								<Compass className="h-8 w-8 animate-spin-slow" />{' '}
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
        /* Background Blob Animation */
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Compass Spin Animation */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        /* Subtle Button Pulse Animation (NEW) */
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        /* Floating Overlays Animation (NEW) */
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float-up-down {
          animation: float-up-down 3s ease-in-out infinite;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
		</section>
	);
};

export default HeroSection;
