<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { Loader2Icon } from "lucide-vue-next";

import { getCatsByKind } from "@/lib/api";

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
			<span aria-live="polite" role="status">
				<template v-if="isPlaceholderData">
					<span class="sr-only">loading...</span>
					<Loader2Icon aria-hidden="true" class="size-4 animate-spin" />
				</template>
			</span>
		</h2>

		<span aria-live="polite" role="status">
			<template v-if="!isPlaceholderData">
				<span class="sr-only">loading...</span>
				<Loader2Icon  aria-hidden="true" class="size-8 animate-spin" />
			</template>
		</span>

		<div v-if="error != null">{{ String(error) }}</div>

		<ul role="list">
			<li v-for="result of data?.results" :key="result.id">
				<div>{{ result.name }} ({{ result.kind }})</div>
			</li>
		</ul>
	</section>
</template>
