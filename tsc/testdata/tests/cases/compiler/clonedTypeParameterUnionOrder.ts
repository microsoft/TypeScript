// @strict: true
// @noEmit: true
// @checkOrder: default, reverse, typesfirst

// @filename: a.ts
interface Pair<A, B> { a: A; b: B }
interface Box<U> { m<T>(x: T): Pair<T, U> }
declare function call<A, R>(f: (x: A) => R): (x: A) => R;
declare const bs: Box<string>;
declare const bn: Box<number>;
const n = call(bn.m);

// @filename: b.ts
declare const c: boolean;
const r = c ? call(bs.m) : call(bn.m);
