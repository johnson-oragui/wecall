export interface UserI {
	id: string;
	email: string;
	username: string;
}

export interface UserTokenI {
	id: string;
	email: string;
	username: string;
	tokens: {
		auth: string;
	};
}
