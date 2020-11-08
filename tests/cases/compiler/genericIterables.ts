// @target: es6
// @lib: es2018
// @downlevelIteration: true

/**
 * Creates a new identity function with a type argument `T` that enforces that a given type `Q` is identical to `T`.
 */
export function constrainExact<T>() {
	return (x => x) as <Q extends T>(this: [T] extends [Q] ? void : never, arg: Q) => Q;
}

async function* f<A, B, C>(
    source0: AsyncIterableIterator<A> & { [Symbol.asyncIterator](): Generator<B> } & IterableIterator<C>,
    source1: AsyncIterableIterator<A> | { [Symbol.asyncIterator](): Generator<B> } | IterableIterator<C>,
    source2: (AsyncIterableIterator<A> | { [Symbol.asyncIterator](): Generator<B> }) & IterableIterator<C>,
	source3: AsyncIterableIterator<A> & AsyncGenerator<B>,
	source4: IterableIterator<C>,
	source5: AsyncIterableIterator<A> & Generator<B>,
	source6: {
		[Symbol.iterator](): Generator<B>;
		[Symbol.asyncIterator](): AsyncGenerator<A>;
	},
	source7: Iterable<A> | AsyncIterable<B>,
	source8: Iterable<A> & AsyncIterable<B>,
	source9: {
		a: 1,
		[Symbol.iterator]<T>(this: T): Generator<T[keyof T]>;
	} & {
		[Symbol.asyncIterator]<T>(this: T): AsyncGenerator<keyof T>;
	},
	source10: ({
		a: true,
		b: 2,
		[Symbol.iterator]<T>(this: T): Generator<keyof T>;
	} | {
		a: false,
		c: 3,
		[Symbol.iterator]<T>(this: T): Generator<keyof T>;
	}) & { d: 4 },
	source11: ({
		a: true,
		b: 2,
		[Symbol.iterator]<T>(this: T): Generator<keyof T>;
	} & { e: 5 } | {
		a: false,
		c: 3,
		[Symbol.iterator]<T>(this: T): Generator<T[keyof T]>;
	}) & { d: 4 },
	source12: {
		[Symbol.iterator]<T>(this: T): Generator<keyof T>;
	} & ({ a: 1 } | { b: 2 }),
): AsyncGenerator<A & B, void, undefined> {
	const [c] = source0;
	void c;

	for await (const z of source0) constrainExact<A & B>()(z);
	for await (const z of source1) constrainExact<A | B | C>()(z);
	for await (const z of source2) constrainExact<A | B>()(z);

    yield* source0;

	for await (const z of source3) constrainExact<A & B>()(z);
	for await (const z of source4) constrainExact<C>()(z);
	for await (const z of source5) constrainExact<A>()(z);
	for await (const z of source6) constrainExact<A>()(z);
	for (const z of source6) constrainExact<B>()(z);
	for await (const z of source7) constrainExact<A | B>()(z);
	for await (const z of source8) constrainExact<B>()(z);
	for (const z of source8) constrainExact<A>()(z);
	for (const z of source9) constrainExact<1>()(z);
	for await (const z of source9) constrainExact<"a">()(z);

	// We do all these tests together because we need to make sure the cacheing logic didn't get screwed up

	if (source10.a) {
		for (const z of source10) constrainExact<"a" | "b" | "d">()(z);
		for (const z of source10[Symbol.iterator]()) constrainExact<"a" | "b" | "d">()(z);
	}
	for (const z of source10) constrainExact<"a" | "b" | "c" | "d">()(z);

	if (source11.a) {
		for (const z of source11) constrainExact<"a" | "b" | "d" | "e">()(z);
	}
	for (const z of source11) constrainExact<false | 4 | 3 | "a" | "b" | "e" | "d">()(z);
	const [h] = [...(source11.a ? [...source11] : source11.a === false && [...source11])];
	constrainExact<false | 4 | "a" | "b" | "e" | "d" | 3>()(h);
	for (const z of source12) constrainExact<"a" | "b">()(z);
}
