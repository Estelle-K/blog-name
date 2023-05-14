<script lang="ts">
	import LabelAsterisk from './LabelAsterisk.svelte';
	export let name: string;
	export let label: string;
	export let item: Record<string, unknown> | null;
	export let required = false;

	$: published = item?.published;
	$: selected = published === true ? true : false;
</script>

<div class="my-5 flex">
	<legend>{label}<LabelAsterisk {required} /></legend>
	<div class="mx-5 flex gap-x-5 pl-5">
		<input type="radio" id="true" {name} value={true} bind:group={selected} />
		<label for="true">Yes</label>
		<input type="radio" id="false" {name} value={false} bind:group={selected} />
		<label for="false">No</label>
	</div>
</div>
