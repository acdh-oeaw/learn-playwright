<script lang="ts" setup>
import type { WebSite, WithContext } from "schema-dts";
import { description, title } from "@/config/metadata.config";

const env = useRuntimeConfig();

const route = useRoute();

const locale = "en";

const jsonLd: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: title,
	description: description,
};

useHead({
	htmlAttrs: {
		lang: locale,
	},
	titleTemplate: ["%s", title].join(" | "),
	link: [{ href: "/favicon.ico", rel: "icon", sizes: "any" }],
	meta: [
		{ name: "description", content: description },
		{ property: "og:type", content: "website" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:creator", content: "@acdh_oeaw" },
		{ name: "twitter:site", content: "@acdh_oeaw" },
	],
	script: [{ type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) }],
});
</script>

<template>
	<div class="min-h-full bg-white text-neutral-900">
		<SkipLink target-id="main-content">Skip to main content</SkipLink>

		<NuxtErrorBoundary>
			<slot />

			<template #error="{ error }">
				<p>An error occurred: {{ error }}</p>
			</template>
		</NuxtErrorBoundary>
	</div>
</template>
