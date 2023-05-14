import { JWT_SECRET } from '$env/static/private';
import prisma from '$lib/utils/prisma';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		try {
			const data = await request.formData();
			const email = data.get('email') as string;
			const password = data.get('password') as string;

			const { id, name, passwordHash } = await prisma.user.findFirstOrThrow({
				where: { email },
				select: { id: true, name: true, passwordHash: true }
			});

			const passwordCompare = await bcrypt.compareSync(password, passwordHash);

			if (!passwordCompare) throw true;

			cookies.set('jwt', jwt.sign({ id, name }, JWT_SECRET), { path: '/', secure: false });

			return { success: true };
		} catch {
			return fail(401, { error: 'Authentication failed' });
		}
	}
};
