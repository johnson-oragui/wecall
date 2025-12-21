declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';

		NEXTAUTH_SECRET: string;

		NEXT_PUBLIC_NEXTAUTH_URL: string;
		API_BASE_URL: string;
		BACKEND_WS_URL: string;
	}
}
