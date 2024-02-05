<script lang="ts" setup>
import { getCatKinds } from "@/lib/db";

const props = defineProps<{
	kinds: Array<string>;
}>();

const router = useRouter();

const options = getCatKinds();
const selected = props.kinds[0] ?? "";

function onSubmit(event: Event) {
	const formData = new FormData(event.currentTarget as HTMLFormElement);
	const kind = formData.get("kind") as string;
	const filters = {
		kind: kind !== "all" ? kind : undefined,
	};
	router.push({ query: filters });
}
</script>

<template>
	<form className="flex items-end gap-4" @submit.prevent="onSubmit" role="search">
		<label class="grid gap-1">
			<span class="text-neutral-600 text-sm">Cat kind</span>
			<select class="rounded-md px-2 py-1" name="kind">
				<option :selected="selected === ''" value="all">Select a kind</option>
				<option v-for="kind of options" :key="kind" :selected="selected === kind" :value="kind">
					{{ kind }}
				</option>
			</select>
		</label>
		<button class="text-sm px-4 py-1.5 rounded-md bg-neutral-900 text-white">Search</button>
	</form>
</template>
