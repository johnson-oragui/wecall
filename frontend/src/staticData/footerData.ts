import { Github, X, Linkedin } from 'lucide-react';

const quickLinks = [
	{ name: 'About Us', href: '/about' },
	{ name: 'Privacy Policy', href: '/privacy' },
	{ name: 'Terms of Service', href: '/terms' },
	{ name: 'Contact', href: '/contact' },
];

const socialLinks = [
	{ name: 'GitHub', icon: Github, href: 'https://github.com/johnson-oragui' },
	{ name: 'X', icon: X, href: 'https://x.com/johnson_oragui' },
	{
		name: 'LinkedIn',
		icon: Linkedin,
		href: 'https://linkedin.com/johnson-oragui',
	},
];

export { socialLinks, quickLinks };
