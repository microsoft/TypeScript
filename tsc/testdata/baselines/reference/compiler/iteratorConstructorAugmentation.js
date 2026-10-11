//// [tests/cases/compiler/iteratorConstructorAugmentation.ts] ////

//// [iteratorConstructorAugmentation.ts]
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


//// [iteratorConstructorAugmentation.js]
"use strict";
const c = Iterator.from(a);
const d = Iterator.from(b);
const e = Iterator.from;
const f = Iterator.from;
Iterator.f();
const g = Iterator.from(a);
Iterator.from(1);


//// [iteratorConstructorAugmentation.d.ts]
interface IteratorConstructor {
    f(): void;
}
declare const a: Iterator<number>;
declare const b: Iterable<string>;
declare const c: IteratorObject<number, undefined, unknown>;
declare const d: IteratorObject<string, undefined, unknown>;
declare const e: <T>(value: Iterable<T, unknown, undefined> | Iterator<T, unknown, undefined>) => IteratorObject<T, undefined, unknown>;
declare const f: (value: Iterable<number, unknown, undefined> | Iterator<number, unknown, undefined>) => IteratorObject<number, undefined, unknown>;
declare const g: IteratorObject<string, undefined, unknown>;
