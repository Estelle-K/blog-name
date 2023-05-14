<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let busy = false;
</script>

<section>
	<Article {busy} item={data.posts[0]} />
</section>
