import { groupByToMap, times } from "@acdh-oeaw/lib";
import { faker } from "@faker-js/faker";

faker.seed(123);

export interface Cat {
	id: string;
	name: string;
	kind: string;
}

const db = {
	cats: new Map<Cat["id"], Cat>(),
};

times(100).forEach(() => {
	const cat: Cat = {
		id: faker.string.uuid(),
		name: faker.person.firstName(),
		kind: faker.animal.cat(),
	};

	db.cats.set(cat.id, cat);
});

const indices = {
	catsByKind: groupByToMap(Array.from(db.cats.values()), (cat) => cat.kind),
};

export function getCatKinds() {
	return Array.from(indices.catsByKind.keys());
}

export function getCatsByKind(kinds: Array<Cat["kind"]>) {
	return kinds.length === 0
		? Array.from(db.cats.values())
		: kinds.flatMap((kind) => {
				return indices.catsByKind.get(kind) ?? [];
			});
}
