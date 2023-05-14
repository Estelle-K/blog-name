<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import IconClock from '$lib/components/icons/IconClock.svelte';
	import { createEventDispatcher } from 'svelte';
	import BusyOverlay from './BusyOverlay.svelte';

	type T = $$Generic; // eslint-disable-line no-undef

	export let itemName: string;
	export let item:
		| (T & {
				id: string | null;
				updatedAt?: Date;
				updatedBy?: { name: string } | null;
				labels?: { id: string; name: string }[];
		  })
		| null;
	export let busy = false;
	export let arrayFields: string[] | undefined = undefined;

	const dispatch = createEventDispatcher<{ cancel: never; save: T }>();

	const handleCancel = () => {
		dispatch('cancel');
	};

	const handleSave = (e: { currentTarget: HTMLFormElement }) => {
		const formData = new FormData(e.currentTarget);
		const data: Record<string, unknown> = {};

		if (arrayFields) {
			for (const key of arrayFields) {
				data[key] = [];
			}
		}

		for (let field of formData) {
			const [key, value] = field;
			if (arrayFields?.includes(key)) {
				(data[key] as unknown[]).push(value);
			} else {
				data[key] = value;
			}
		}
		dispatch('save', data as T);
	};
</script>

<form on:submit|preventDefault={handleSave}>
	<dialog open={!!item}>
		<input type="hidden" name="id" value={item?.id} />
		<article class="w-full">
			<BusyOverlay visible={busy} />
			<header class="mb-2">
				<!-- svelte-ignore a11y-missing-content -->
				<a
					href="#cancel"
					aria-label="Cancel"
					class="close"
					on:click|preventDefault={handleCancel}
				/>
				{item?.id ? 'Edit' : 'Add'}
				{itemName}
			</header>
			<slot />
			{#if item?.id}
				<small class="flex flex-row items-center gap-x-2">
					<span><IconClock /></span>
					Last updated
					{item?.updatedAt ? formatDistanceToNow(new Date(item.updatedAt)) : ''}
					{item.updatedBy ? ` by ${item.updatedBy.name}` : ''}
				</small>
			{/if}
			<footer>
				<button class="secondary" on:click|preventDefault={handleCancel}>Cancel</button>
				<button type="submit">Save</button>
			</footer>
		</article>
	</dialog>
</form>
