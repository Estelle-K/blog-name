<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	import '@picocss/pico';
	import '../app.css';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Name • Blog</title>
	<meta name="description" content="Name's blog" />
</svelte:head>

<Header isAuthenticated={data.isAuthenticated} />
<main class="container-fluid">
	<slot />
</main>
<Footer />
