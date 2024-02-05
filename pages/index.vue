<script lang="ts" setup>
import { createUrlSearchParams } from "@acdh-oeaw/lib";

useHead({
	title: "Home",
});

const route = useRoute();

const kinds = computed(() => {
	const searchParams = createUrlSearchParams(route.query);
	return searchParams.getAll("kind");
});
</script>

<template>
	<MainContent class="max-w-4xl mx-auto w-full py-8 gap-8 flex flex-col">
		<h1>Search cats</h1>
		<SearchForm :kinds="kinds" />
		<SearchResults :kinds="kinds" />
	</MainContent>
</template>
