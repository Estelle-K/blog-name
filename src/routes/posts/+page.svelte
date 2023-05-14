<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import AuthorizationAlert from '$lib/components/AuthorizationAlert.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import CheckboxList from '$lib/components/inputs/CheckboxList.svelte';
	import RadioInput from '$lib/components/inputs/RadioInput.svelte';
	import TextareaInput from '$lib/components/inputs/TextareaInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import ModalEditor from '$lib/components/ModalEditor.svelte';
	import { savable } from '$lib/utils/savable';
	import { trpc } from '$lib/trpc/client';
	import type { RouterInputs, RouterOutputs } from '$lib/trpc/router';
	import { TRPCClientError } from '@trpc/client';
	import type { PageData } from './$types';

	export let data: PageData;

	let busy = false;
	let item: RouterInputs['posts']['save'] | null = null;
	let labels: RouterOutputs['labels']['loadOptions'] = [];
	let errors: { message: string; path: string[] }[] | null = null;
	let needsAuthorization = false;

	const handleAdd = async () => {
		if (!data.isAuthenticated) {
			needsAuthorization = true;
			return;
		}

		item = {
			id: null,
			title: '',
			introduction: '',
			content: '',
			published: false,
			labelIds: []
		};

		labels = await trpc().labels.loadOptions.query();
	};

	const handleEdit = async (e: CustomEvent<string>) => {
		if (!data.isAuthenticated) {
			needsAuthorization = true;
			return;
		}

		busy = true;
		[item, labels] = await Promise.all([
			trpc().posts.load.query(e.detail),
			trpc().labels.loadOptions.query()
		]);
		busy = false;
	};

	const handleDelete = async (e: CustomEvent<string>) => {
		if (!data.isAuthenticated) {
			needsAuthorization = true;
			return;
		}

		busy = true;
		await trpc().posts.delete.mutate(e.detail);
		await invalidateAll();
		busy = false;
	};

	const handleCancel = () => {
		item = null;
		errors = null;
	};

	const handleSave = async (e: { detail: RouterInputs['posts']['save'] }) => {
		if (!data.isAuthenticated) {
			needsAuthorization = true;
			return;
		}

		busy = true;
		try {
			await trpc().posts.save.mutate(savable(e.detail));
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
	title="Posts"
	items={data.posts}
	columns={[
		{ title: 'Title', grow: true, accessor: 'title' },
		{ title: 'Published', grow: true, align: 'right', accessor: 'published' },
		{ title: 'Labels', align: 'right', accessor: (post) => post._count.labels }
	]}
	on:add={handleAdd}
	on:edit={handleEdit}
	on:delete={handleDelete}
/>

<ModalEditor
	{item}
	arrayFields={['labelIds']}
	itemName="post"
	on:cancel={handleCancel}
	on:save={handleSave}
>
	<TextInput name="title" label="Title" required {errors} {item} />
	<div class="grid">
		<RadioInput name="published" label="Published" required {item} />
	</div>
	<TextareaInput name="introduction" label="Introduction" {errors} {item} />
	<TextareaInput name="content" label="Content" {errors} {item} />
	<CheckboxList name="labelIds" label="Labels" {item} options={labels} />
</ModalEditor>

<AuthorizationAlert visible={needsAuthorization} on:close={() => (needsAuthorization = false)} />
