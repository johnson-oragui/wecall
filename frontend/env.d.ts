declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';

		NEXTAUTH_SECRET: string;

		NEXT_PUBLIC_NEXTAUTH_URL: string;
	}
}
