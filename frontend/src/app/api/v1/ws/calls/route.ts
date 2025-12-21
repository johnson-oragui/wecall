import { cookies } from 'next/headers';
import WebSocket from 'ws';

let ws: WebSocket | null = null;

export async function POST() {
	const token = (await cookies()).get('access_token')?.value;

	if (!token) return new Response('Unauthorized', { status: 401 });

	if (ws && ws.readyState === WebSocket.OPEN)
		return new Response('Already connected');

	ws = new WebSocket(`${process.env.BACKEND_WS_URL}/ws/calls/?token=${token}`);

	ws.on('open', (stream: unknown) => {
		console.log('Notify WS connected');
		console.log('stream: ', stream);
	});

	ws.on('message', (data) => {
		console.log('WebSocket.RawData: ', data);
	});

	ws.on('close', () => {
		ws = null;
	});

	return new Response('Ws connected');
}
