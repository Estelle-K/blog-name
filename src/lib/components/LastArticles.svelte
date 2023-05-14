<script lang="ts">
	import BusyOverlay from '$lib/components/BusyOverlay.svelte';
	import Done from '$lib/components/icons/IconDone.svelte';

	type T = {
		id: string;
		title: string;
		content: string;
		introduction: string;
		published: boolean;
		updatedAt: Date;
		labels: { name: string }[];
	};

	export let busy = false;
	export let items: T[];

	$: items = items.slice(0, 5);
</script>

<BusyOverlay visible={busy} />
<div class="container">
	<h2 class="px-2 text-2xl md:my-5">Last articles</h2>
	{#if items.length}
		{#each items as item}
			<ul>
				{#if item.published}
					<li class="flex items-center gap-x-2 py-2 text-base capitalize">
						<Done height={24} width={24} fill="#d81b60" />
						<a href="/article/{item.id}">
							{item.title}
						</a>
					</li>
				{/if}
			</ul>
		{/each}
	{/if}
</div>
