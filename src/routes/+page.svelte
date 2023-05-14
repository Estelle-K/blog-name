<script lang="ts">
	import Articles from '$lib/components/Articles.svelte';
	import LastArticles from '$lib/components/LastArticles.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let busy = false;
</script>

<div class="grid gap-x-10 md:grid-cols-3">
	<section class="mb-3 md:col-span-2">
		<Articles {busy} items={data.posts} />
	</section>
	<aside class="mb-3">
		<Tags {busy} items={data.labels} />
		<hr class="my-5" />
		<LastArticles {busy} items={data.posts} />
	</aside>
</div>
