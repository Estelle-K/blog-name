<script>
	import { page } from '$app/stores';
	import Wrong from '$lib/assets/images/wrong.jpg';

	let naturalHeight;
	let naturalWidth;
</script>

<div class="container relative">
	<img
		bind:naturalWidth
		bind:naturalHeight
		loading="lazy"
		src={Wrong}
		alt="Something's wrong"
		class="h-auto w-full"
	/>
	<div class="absolute left-5 top-2 rounded-lg bg-[#d81b60] p-1 md:p-3 md:text-2xl">
		{$page.status}
		{$page?.error?.message}
	</div>
</div>
