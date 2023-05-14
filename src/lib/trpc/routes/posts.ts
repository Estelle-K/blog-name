import prisma from '$lib/utils/prisma';
import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';

export const posts = t.router({
	list: t.procedure
		.use(logger)
		.input(z.string().optional())
		.query(({ input }) =>
			prisma.post
				.findMany({
					select: {
						id: true,
						title: true,
						content: true,
						introduction: true,
						_count: { select: { labels: true } },
						labels: { select: { id: true, name: true } },
						published: true,
						updatedAt: true
					},
					orderBy: { updatedAt: 'desc' },
					where: input
						? {
								OR: [
									{ title: { contains: input } },
									{ introduction: { contains: input } },
									{ content: { contains: input } },
									{ id: { contains: input } }
								]
						  }
						: undefined
				})
				.then((posts) => posts.map((post) => ({ ...post })))
		),

	load: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string())
		.query(({ input }) =>
			prisma.post
				.findUniqueOrThrow({
					select: {
						id: true,
						title: true,
						content: true,
						labels: { select: { id: true } },
						introduction: true,
						published: true,
						updatedAt: true,
						updatedBy: { select: { name: true } }
					},
					where: { id: input }
				})
				.then(({ labels, ...rest }) => ({
					...rest,
					labelIds: labels.map((label) => label.id)
				}))
		),

	findPost: t.procedure
		.use(logger)
		.input(z.string())
		.query(({ input }) =>
			prisma.post
				.findUniqueOrThrow({
					select: {
						id: true,
						title: true,
						content: true,
						labels: { select: { name: true } },
						introduction: true,
						published: true,
						updatedAt: true,
						updatedBy: { select: { name: true } }
					},
					where: { id: input }
				})
				.then(({ ...rest }) => ({
					...rest
				}))
		),

	save: t.procedure
		.use(logger)
		.use(auth)
		.input(
			z.object({
				id: z.string().nullable(),
				title: z.string(),
				content: z.string(),
				introduction: z.string(),
				published: z
					.enum(['0', '1', 'true', 'false'])
					.catch('false')
					.transform((value) => value == 'true' || value == '1'),
				labelIds: z.array(z.string())
			})
		)
		.mutation(async ({ input: { id, labelIds, ...rest }, ctx: { userId } }) => {
			if (id) {
				await prisma.post.update({
					data: {
						...rest,
						labels: {
							set: [],
							connect: [...labelIds.map((id) => ({ id }))]
						},
						updatedByUserId: userId
					},
					where: { id },
					include: { labels: true }
				});
			} else {
				await prisma.post.create({
					data: {
						...rest,
						labels: { connect: [...labelIds.map((id) => ({ id }))] },
						updatedByUserId: userId
					}
				});
			}
		}),

	delete: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string())
		.mutation(async ({ input: id }) => {
			await prisma.post.update({
				where: { id },
				data: {
					labels: { set: [] }
				},
				include: {
					labels: true
				}
			});
			await prisma.post.delete({ where: { id } });
		})
});
