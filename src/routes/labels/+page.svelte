<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import AuthorizationAlert from '$lib/components/AuthorizationAlert.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import ModalEditor from '$lib/components/ModalEditor.svelte';
	import { savable } from '$lib/utils/savable';
	import { trpc } from '$lib/trpc/client';
	import type { RouterInputs } from '$lib/trpc/router';
	import { TRPCClientError } from '@trpc/client';
	import type { PageData } from './$types';

	export let data: PageData;

	let busy = false;
	let item: RouterInputs['labels']['save'] | null = null;
	let errors: { message: string; path: string[] }[] | null = null;
	let needsAuthorization = false;

	const handleAdd = async () => {
		if (!data.isAuthenticated) {
			needsAuthorization = true;
			return;
		}

		item = {
			id: null,
			name: ''
		};
	};

	const handleEdit = async (e: CustomEvent<string>) => {
		if (!data.isAuthenticated) {
			needsAuthorization = true;
			return;
		}

		busy = true;
		item = await trpc().labels.load.query(e.detail);
		busy = false;
	};

	const handleDelete = async (e: CustomEvent<string>) => {
		if (!data.isAuthenticated) {
			needsAuthorization = true;
			return;
		}

		busy = true;
		await trpc().labels.delete.mutate(e.detail);
		await invalidateAll();
		busy = false;
	};

	const handleCancel = () => {
		item = null;
		errors = null;
	};

	const handleSave = async (e: { detail: RouterInputs['labels']['save'] }) => {
		if (!data.isAuthenticated) {
			needsAuthorization = true;
			return;
		}

		busy = true;
		try {
			await trpc().labels.save.mutate(savable(e.detail));
			item = null;
			await invalidateAll();
		} catch (err) {
			if (err instanceof TRPCClientError) {
				errors = JSON.parse(err.message);
			} else {
				throw err;
			}
		} finally {
			busy = false;
		}
	};
</script>

<DataTable
	{busy}
	title="Labels"
	items={data.labels}
	columns={[{ title: 'Title', grow: true, accessor: 'name' }]}
	on:add={handleAdd}
	on:edit={handleEdit}
	on:delete={handleDelete}
/>

<ModalEditor {item} itemName="label" on:cancel={handleCancel} on:save={handleSave}>
	<TextInput name="name" label="Name" required {errors} {item} />
</ModalEditor>

<AuthorizationAlert visible={needsAuthorization} on:close={() => (needsAuthorization = false)} />
