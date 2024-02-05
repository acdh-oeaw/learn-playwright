import { createUrl, createUrlSearchParams, request } from "@acdh-oeaw/lib";
import { queryOptions } from "@tanstack/vue-query";

import type { Cat } from "@/lib/db";

export function getCatsByKind(kinds: MaybeRef<Array<Cat["kind"]>>) {
	const env = useRuntimeConfig();

	return queryOptions({
		queryKey: ["cats", { kinds }] as const,
		queryFn({ queryKey: [, { kinds }] }) {
			const url = createUrl({
				baseUrl: env.public.NUXT_PUBLIC_APP_BASE_URL,
				pathname: "/api/cats",
				searchParams: createUrlSearchParams({
					kind: kinds,
				}),
			});

			return request(url, { responseType: "json" }) as Promise<{ results: Array<Cat> }>;
		},
	});
}
