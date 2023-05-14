<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	export let to: string | undefined = undefined;
	export let title: string;

	const dispatch = createEventDispatcher<{ click: never }>();

	const handleClick = (e: MouseEvent) => {
		if (!to) {
			e.preventDefault();
			dispatch('click');
		}
	};
</script>

<li class="name p-0 text-3xl hover:text-[#d81b60]">
	<a class:active={$page.url.pathname === to} href={to || '#'} on:click={handleClick}>{title}</a>
</li>
