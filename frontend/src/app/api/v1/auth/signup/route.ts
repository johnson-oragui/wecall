'use server';

import { NextResponse } from 'next/server';

const BASE_URL = process.env.API_BASE_URL;

export async function POST(req: Request) {
	try {
		const body = await req.json();
		console.log('body: ', body);

		const response = await fetch(`${BASE_URL}/v1/auth/register/`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		});

		const data = await response.json();

		console.log('signup data: ', data);
		console.log('Content-type: ', response.headers.get('Content-type'));

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

		return NextResponse.json(
			{ ...data, status: 'success' },
			{ status: response.status },
		);
	} catch (error) {
		console.error('Error signin up user:', error);
		return NextResponse.json(
			{ message: 'Internal Server Error', status: 'error' },
			{ status: 500 },
		);
	}
}
