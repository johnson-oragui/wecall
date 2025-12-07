import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/client/Header';
import { navLinks } from '../staticData/headerData';
import Footer from '../components/client/Footer';
import { quickLinks } from '../staticData/footerData';

export const metadata: Metadata = {
	title: 'WeCall',
	description: 'WeCall voice and video calls',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header appName="WeCall" navItems={navLinks} />
				<main className="pt-5">{children}</main>
				<Footer quickLinks={quickLinks} />
			</body>
		</html>
	);
}
