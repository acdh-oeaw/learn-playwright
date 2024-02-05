import { createUrlSearchParams, wait } from "@acdh-oeaw/lib";

import { getCatsByKind } from "@/lib/db";

export default defineEventHandler(async (event) => {
	const searchParams = createUrlSearchParams(getQuery(event));

	const filters = {
		kinds: searchParams.getAll("kind"),
	};

	const results = getCatsByKind(filters.kinds).slice(0, 20);

	await wait(1500);

	return { results };
});
