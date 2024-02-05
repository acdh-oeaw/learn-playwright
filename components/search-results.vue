<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";

import { getCatsByKind } from "@/lib/api";
import LoadingSpinner from "./loading-spinner.vue";

const props = defineProps<{
	kinds: Array<string>;
}>();

const kinds = toRef(props, "kinds");

const { data, isPending, isPlaceholderData, error } = useQuery(getCatsByKind(kinds));
</script>

<template>
	<section class="grid gap-4">
		<h2 class="flex gap-2 items-center">
			Results
			<LoadingSpinner v-if="isPlaceholderData" />
		</h2>

		<LoadingSpinner v-if="isPending" />

		<div v-if="error != null">{{ String(error) }}</div>

		<ul role="list">
			<li v-for="result of data?.results" :key="result.id">
				<div>{{ result.name }} ({{ result.kind }})</div>
			</li>
		</ul>

		<div aria-live="polite" class="sr-only">
			<template v-if="isPending || isPlaceholderData">loading...</template>
		</div>
	</section>
</template>
