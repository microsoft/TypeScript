// @target: es2015
// @lib: es2015, es2025.iterator
// @strict: true
// @declaration: true

interface IteratorConstructor {
    f(): void;
}

declare const a: Iterator<number>;
declare const b: Iterable<string>;

const c: IteratorObject<number, undefined, unknown> = Iterator.from(a);
const d: IteratorObject<string, undefined, unknown> = Iterator.from(b);
const e = Iterator.from;
const f = Iterator.from<number>;

Iterator.f();

const g: IteratorObject<string, undefined, unknown> = Iterator.from(a);
Iterator.from(1);
