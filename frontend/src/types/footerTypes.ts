import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface SocialLinks {
	name: string;
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>;
	href: string;
}

export interface QuickLinks {
	name: string;
	href: string;
}

export interface FooterProps {
	quickLinks: QuickLinks[];
	socialLinks?: SocialLinks[];
}
