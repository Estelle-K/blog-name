import prisma from '$lib/utils/prisma';
import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';

export const labels = t.router({
	list: t.procedure
		.use(logger)
		.input(z.string().optional())
		.query(({ input }) =>
			prisma.label
				.findMany({
					select: {
						id: true,
						name: true,
						createdAt: true,
						updatedAt: true,
						_count: { select: { posts: true } },
						posts: {
							select: { id: true }
						}
					},
					orderBy: { updatedAt: 'desc' },
					where: input ? { name: { contains: input } } : undefined
				})
				.then((labels) => labels.map((label) => ({ ...label })))
		),

	loadOptions: t.procedure.use(logger).query(() =>
		prisma.label
			.findMany({
				select: { id: true, name: true },
				orderBy: { name: 'asc' }
			})
			.then((labels) => labels.map(({ id, name }) => ({ label: name, value: id })))
	),

	findPosts: t.procedure
		.use(logger)
		.input(z.string().optional())
		.query(({ input }) =>
			prisma.label.findUniqueOrThrow({
				select: {
					id: true,
					name: true,
					createdAt: true,
					updatedAt: true,
					_count: { select: { posts: true } },
					posts: {
						select: {
							id: true,
							title: true,
							content: true,
							labels: { select: { name: true } },
							introduction: true,
							published: true,
							updatedAt: true
						}
					}
				},
				where: { id: input }
			})
		),

	load: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string())
		.query(({ input }) =>
			prisma.label.findUniqueOrThrow({
				select: {
					id: true,
					name: true,
					posts: { select: { id: true } },
					createdAt: true,
					updatedAt: true,
					updatedBy: { select: { name: true } }
				},
				where: { id: input }
			})
		),

	save: t.procedure
		.use(logger)
		.use(auth)
		.input(
			z.object({
				id: z.string().nullable(),
				name: z.string()
			})
		)
		.mutation(async ({ input: { id, ...rest }, ctx: { userId } }) => {
			if (id) {
				await prisma.label.update({
					data: {
						...rest,
						updatedByUserId: userId
					},
					where: { id }
				});
			} else {
				await prisma.label.create({
					data: { ...rest, updatedByUserId: userId }
				});
			}
		}),

	delete: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string())
		.mutation(async ({ input: id }) => {
			await prisma.label.delete({ where: { id } });
		})
});
