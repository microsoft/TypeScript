// @target: ES6
// @downlevelIteration: true

declare const success: { success: true, value: object };
declare const failure: { success: false, error: string };
declare const result: typeof success | typeof failure;

const iterable = {
	*[Symbol.iterator]<T>(this: T) {
		for (const x in this) yield x;
	}
};

function* foo(): IterableIterator<"success" | "value" | "error"> {
    yield* { ...result, ...iterable }; // Should be OK
}

function takesKeys(k: "success" | "value" | "error") {
	void k;
}

for (const k of { ...iterable, ...result }) {
	takesKeys(k);
}

const [j] = { ...iterable, ...result };
takesKeys(j);
const [k] = [...{ ...iterable, ...result }];
takesKeys(k);

function getObj<T extends string>(str: T) {
	return {
		str,
		*[Symbol.iterator]<T>(this: T) {
			for (const x in this) yield this[x];
		}
	};
}

for (const k of getObj("abc")) {
	void k;
}

for (const k of getObj<"123">("123")) {
	void k;
}

for (const k of new class {
	str = "abc" as const;
	*[Symbol.iterator]<T>(this: T) {
		for (const x in this) yield this[x];
	}
}) {
	void k;
}

function assertType<T>(x: T) { void x; }

for (const x of { ...iterable, ...success }) {
	assertType<"success" | "value">(x);
}

for (const x of { ...failure, ...iterable }) {
	assertType<"success" | "error">(x);
}

const iterableResult = { ...iterable, ...result };

for (const x of iterableResult) {
	assertType<"success" | "error" | "value">(x);
}

if (iterableResult.success) {
	for (const x of iterableResult) {
		assertType<"success" | "value">(x);
	}
}
