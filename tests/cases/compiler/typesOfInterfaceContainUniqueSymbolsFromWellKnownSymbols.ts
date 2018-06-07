// @lib: es6
const s = Symbol("s");

interface I {
    n: number;
    [s]: string;
    [Symbol.iterator](): IterableIterator<[string, string]>;
}

type K = keyof I;
type T = I[K];