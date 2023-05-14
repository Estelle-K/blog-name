<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import HeaderNavLink from './HeaderNavLink.svelte';

	export let isAuthenticated: boolean;

	const logout = async () => {
		await fetch('/logout', { method: 'POST' });
		await invalidateAll();
		await goto('/login');
	};
</script>

<header class="mx-auto grid h-40 grid-cols-1 items-center md:grid-cols-2 md:px-3">
	<div aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
		<a href="/" class="focus:bg-transparent">
			<div class="name px-4 text-5xl">Name's blog</div>
		</a>
	</div>
	<nav class="flex justify-end">
		<ul class="flex gap-x-5 px-3">
			{#if isAuthenticated}
				<HeaderNavLink to="/posts" title="Posts" />
				<HeaderNavLink to="/labels" title="Labels" />
				<HeaderNavLink on:click={logout} title="Logout" />
			{:else}
				<HeaderNavLink to="/login" title="Login" />
			{/if}
			<HeaderNavLink to="/about" title="About" />
		</ul>
	</nav>
</header>
