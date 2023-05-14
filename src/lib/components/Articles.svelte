<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import BusyOverlay from '$lib/components/BusyOverlay.svelte';
	import IconClock from '$lib/components/icons/IconClock.svelte';

	type T = {
		id: string;
		title: string;
		content: string;
		introduction: string;
		published: boolean;
		updatedAt: Date;
		labels: { name: string }[];
		_count: { labels: number };
	};

	export let busy = false;
	export let items: T[];
</script>

<BusyOverlay visible={busy} />
{#if items.length}
	{#each items as item}
		{#if item.published}
			<article class="my-5 py-5">
				<a href="/article/{item.id}">
					<hgroup>
						<h2 class="py-3 text-3xl capitalize">{item.title}</h2>
						<div class="md:flex md:justify-between">
							<small class="flex flex-row items-center gap-x-2 md:justify-end md:gap-x-4">
								<span><IconClock /></span>
								Last updated
								{item?.updatedAt ? formatDistanceToNow(new Date(item.updatedAt)) : ''}
							</small>
							<div class="flex cursor-none flex-wrap gap-3 py-2 md:justify-end md:py-0">
								{#each item.labels as label}
									<!-- svelte-ignore a11y-invalid-attribute -->
									<div class="capitalize" role="button">{label.name}</div>
								{/each}
							</div>
						</div>
					</hgroup>
					<p>{@html item.introduction}</p>
				</a>
			</article>
		{/if}
	{/each}
{/if}

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
