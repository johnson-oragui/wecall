export interface NavItem {
	name: string;
	href: string;
}

export interface HeaderProps {
	appName?: string;
	navItems?: NavItem[];
	userEmail?: string;
}
