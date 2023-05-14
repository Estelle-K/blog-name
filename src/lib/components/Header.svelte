<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import HeaderNavLink from './HeaderNavLink.svelte';
	import Star from '$lib/components/icons/Star.svelte';

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
			<span class="relative inline-flex">
				<Star fill={'#FBD000'} height="76" width="76" />
				<span class="absolute left-1/2 top-1/2 -mt-1 ml-0.5 flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-stone-800 opacity-75"
					/>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-stone-900" />
				</span>
				<span class="absolute left-1/2 top-1/2 -ml-2.5 -mt-1 flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-stone-800 opacity-75"
					/>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-stone-900" />
				</span>
				<div class="name absolute left-3/4 top-3/4 -ml-2 -mt-3 w-max text-5xl">Name's blog</div>
			</span>
		</a>
	</div>
	<nav class="flex flex-1 justify-end self-end pb-4 md:pb-5">
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
