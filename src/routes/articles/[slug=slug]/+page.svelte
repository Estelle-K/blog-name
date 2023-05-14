<script lang="ts">
	import LabelsArticles from '$lib/components/LabelsArticles.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let busy = false;
</script>

<section>
	{#if data.labels.posts.length}
		<LabelsArticles {busy} item={data.labels} />
	{:else}
		<p class="flex justify-center">No articles found.</p>
	{/if}
</section>
