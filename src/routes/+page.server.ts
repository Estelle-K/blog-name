import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => ({
	posts: router
		.createCaller(await createContext(event))
		.posts.list(event.url.searchParams.get('q') || undefined),
	labels: router
		.createCaller(await createContext(event))
		.labels.list(event.url.searchParams.get('q') || undefined)
});
