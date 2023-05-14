<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import BusyOverlay from '$lib/components/BusyOverlay.svelte';
	import IconClock from '$lib/components/icons/IconClock.svelte';

	type T = {
		id: string;
		name: string;
		updatedAt: Date;
		posts: {
			id: string;
			title: string;
			content: string;
			introduction: string;
			published: boolean;
			updatedAt: Date;
			labels: { name: string }[];
		}[];
		_count: { posts: number };
	};

	export let busy = false;
	export let item: T;
</script>

<BusyOverlay visible={busy} />
{#each item.posts as post}
	{#if post.published}
		<article class="my-5 py-5">
			<a href="/article/{post.id}">
				<hgroup>
					<h2 class="py-3 text-3xl capitalize">{post.title}</h2>
					<div class="md:flex md:justify-between">
						<small class="flex flex-row items-center gap-x-2 md:justify-end md:gap-x-4">
							<span><IconClock /></span>
							Last updated
							{post?.updatedAt ? formatDistanceToNow(new Date(post.updatedAt)) : ''}
						</small>
						<div class="flex cursor-none gap-3 py-2 md:justify-end md:py-0">
							{#each post.labels as label}
								<!-- svelte-ignore a11y-invalid-attribute -->
								<div class="capitalize" role="button">{label.name}</div>
							{/each}
						</div>
					</div>
				</hgroup>
				<p>{post.introduction}</p>
			</a>
		</article>
	{/if}
{/each}

<style>
	[role='button'] {
		cursor: default;
		padding: 0.25rem 0.5rem;
	}

	[role='button']:hover {
		--background-color: var(--primary);
		--border-color: var(--primary);
		--box-shadow: var(--button-box-shadow, 0 0 0 rgba(0, 0, 0, 0));
		--color: var(--primary-inverse);
	}

	article p {
		text-decoration: none;
		color: var(--text-color);
	}
</style>
