<script lang="ts">
	import BusyOverlay from '$lib/components/BusyOverlay.svelte';

	type T = {
		id: string;
		name: string;
		updatedAt: Date;
		posts: {
			id: string;
		}[];
	};

	export let busy = false;
	export let items: T[];
</script>

<BusyOverlay visible={busy} />
<div class="container">
	<h2 class="text-2xl md:my-5">Tags</h2>
	<nav class="flex flex-wrap justify-start">
		{#if items.length}
			{#each items as item}
				{#if item.posts.length > 0}
					<ul>
						<li class="px-1 capitalize">
							<a href="/articles/{item.id}" role="button">
								{item.name}
							</a>
						</li>
					</ul>
				{/if}
			{/each}
		{/if}
	</nav>
</div>
