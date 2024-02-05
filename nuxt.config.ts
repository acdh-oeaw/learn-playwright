import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
	alias: {
		"@": fileURLToPath(new URL("./", import.meta.url)),
	},
	css: ["tailwindcss/tailwind.css", "@/styles/index.css"],
	devtools: { enabled: true },
	postcss: {
		plugins: {
			tailwindcss: {},
		},
	},
	runtimeConfig: {
		public: {
			NUXT_PUBLIC_APP_BASE_URL: process.env.NUXT_PUBLIC_APP_BASE_URL,
		},
	},
	typescript: {
		shim: false,
		strict: true,
		// https://github.com/nuxt/nuxt/issues/14816#issuecomment-1484918081
		tsConfig: {
			compilerOptions: {
				paths: {
					"@/*": ["./*"],
				},
			},
		},
	},
});
