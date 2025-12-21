'use server';

import { NextResponse } from 'next/server';

const BASE_URL = process.env.API_BASE_URL;

export async function POST(req: Request) {
	try {
		const body = await req.json();
		// console.log('body: ', body);

		const response = await fetch(`${BASE_URL}/v1/auth/login/`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		});

		const data = await response.json();

		// console.log('signin data: ', data);

		if (response.status === 422) {
			let message: string = data.data.message;
			if (data.data?.msg.startsWith('Value error')) {
				message = data.data?.msg.substring(12);
			}
			return NextResponse.json(
				{
					message: message.replace(/_/g, ' ') || data.message,
					data: data.data,
					status: 'error',
				},
				{ status: response.status },
			);
		}

		if (response.status === 409) {
			const data = await response.json();
			return NextResponse.json(
				{ message: data.message, status: 'conflict' },
				{ status: response.status },
			);
		}

		if (response.status === 400) {
			const data = await response.json();
			return NextResponse.json(
				{ message: data.message, status: 'bad request' },
				{ status: response.status },
			);
		}

		if (response.status > 499) {
			return NextResponse.json(
				{
					message: data.message,
					status: 'error',
				},
				{ status: response.status },
			);
		}

		const { tokens, ...restOfData } = data.data;

		const accessToken = tokens?.auth ? (tokens.auth as string) : null;
		if (!accessToken) {
			return NextResponse.json(
				{ message: 'unauthorized', status: 'error' },
				{ status: 401 },
			);
		}

		const headers = new Headers();

		headers.append(
			'Set-Cookie',
			`access_token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Lax`,
		);

		return NextResponse.json(
			{ data: restOfData, status: 'success', message: 'Signin Success' },
			{ status: response.status, headers },
		);
	} catch (error) {
		console.error('Error signin user:', error);
		return NextResponse.json(
			{ message: 'Internal Server Error', status: 'error' },
			{ status: 500 },
		);
	}
}
