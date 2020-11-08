// @target: es6
// @lib: es2018
// @downlevelIteration: true

function typeAssert<T>(x: T) { void x; }

async function* f(obj: {
	[Symbol.iterator](): Generator<string, void, unknown>;
    [Symbol.asyncIterator](): AsyncGenerator<number>;
}) {
	for (const y of obj) {
		typeAssert<string>(y);
	}

	for await (const y of obj) {
		typeAssert<number>(y);
	}
}

async function* g<A, B>(obj: AsyncIterableIterator<A> & IterableIterator<B>): AsyncGenerator<A, void, undefined> {
	const [c] = obj;
	void c;
	yield* obj;
}

async function* h<A, B>(obj: AsyncIterableIterator<A> & IterableIterator<B>): AsyncGenerator<A, void, undefined> {
	yield* obj;
}

async function* j<A, B>(obj: AsyncIterableIterator<A> & IterableIterator<B>) {
	yield* obj;
}

async function* i<A, B>(obj: AsyncIterable<A> & Iterable<B>): AsyncGenerator<A, void, undefined>{
	const [c] = obj;
	void c;
	yield* obj;
}
