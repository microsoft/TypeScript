// @target: es6
// @lib: es2018
// @downlevelIteration: true

const obj = {
	a: 1,
	b: 2,

	*[Symbol.iterator]<T>(this: T, x: string) {
		for (const k in this) yield k;
	},
};

for (const i of obj) {

}

const [j] = obj;
const arr = [...obj];

async function* f() {
	for await (const x of obj) {

	}

	for await (const x of {
		async *[Symbol.asyncIterator](arr: string[]) {
			yield* arr;
		}
	}) {

	}

	yield* obj;

	yield* {
		async *[Symbol.asyncIterator](arr: string[]) {
			yield* arr;
		}
	};
}


async function* g<A, B>(x: {
	[Symbol.iterator](x: number): Generator<A>
}) {
	for (const y of x) {}
}


async function* h(obj2: {
	a: number;
	b: number;
	[Symbol.iterator](): Generator<number, void, unknown>;
} | {
    [Symbol.asyncIterator]<T>(this: T, x: string): Generator<Extract<keyof T, string>, void, unknown>;
}) {
	yield* obj2;

	for await (const x of obj2) {

	}

	const [u] = obj2;
	return u;
}

async function* foo(obj2: {
	a: number;
	b: number;
	[Symbol.iterator](): Generator<number, void, unknown>;
} & {
    [Symbol.asyncIterator]<T>(this: T, x: string): Generator<Extract<keyof T, string>, void, unknown>;
}) {
	yield* obj2;

	for await (const x of obj2) {

	}

	const [u] = obj2; // this is fine, just making sure caching works :)
	return u;
}

async function* bar(obj2: {
	a: number;
	b: number;
	[Symbol.iterator](): Generator<number, void, unknown>;
    [Symbol.asyncIterator]<T>(this: T, x: string): Generator<Extract<keyof T, string>, void, unknown>;
}) {
	yield* obj2;

	for await (const x of obj2) {

	}

	const [u] = obj2;
	return u;
}
