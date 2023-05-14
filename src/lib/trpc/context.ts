import { JWT_SECRET } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import jwt from 'jsonwebtoken';

export async function createContext(event: RequestEvent) {
	try {
		const token = event.cookies.get('jwt');

		const { id: userId } = jwt.verify(token || '', JWT_SECRET) as {
			id: string;
		};

		return { userId };
	} catch {
		return { userId: '' };
	}
}

export type Context = inferAsyncReturnType<typeof createContext>;
