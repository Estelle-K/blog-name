<script lang="ts">
	import LabelAsterisk from './LabelAsterisk.svelte';

	export let name: string;
	export let label: string;
	export let required = false;
	export let placeholder = '';
	export let item: Record<string, unknown> | null = null;
	export let errors: { message: string; path: string[] }[] | null = null;

	$: error = errors?.find((e) => e.path.includes(name));
</script>

<label>
	{label}<LabelAsterisk {required} />
	<input
		type="text"
		{name}
		{placeholder}
		{required}
		value={item?.[name]}
		aria-invalid={error ? 'true' : undefined}
	/>
	{#if error}
		<small>{error.message}</small>
	{/if}
</label>

<style>
	input {
		margin-bottom: 0.5em;
	}

	small {
		color: var(--form-element-invalid-active-border-color);
	}
</style>
