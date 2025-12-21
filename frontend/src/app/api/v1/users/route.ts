'use server';

import CallUtil from '@/src/app/calls/util';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	return NextResponse.json(
		{
			message: 'Users fetched successfully',
			status: 'success',
			data: CallUtil.generateDummyUsers(30),
		},
		{ status: 200 },
	);
}
