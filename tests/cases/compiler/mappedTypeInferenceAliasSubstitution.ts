// @strict: true
// @noEmit: true

// repro from #31616

const v = { test: { smth: 5 } };

type Field<A extends string, R> = { [K in A]: R }

const f = <A extends string, B extends string, R>(x: { [K in A]: Field<B, R> }): R => ({} as any);
const r1 = f(v);

const g = <A extends string, B extends string, R>(x: Field<A, Field<B, R>>): R => ({} as any);
const r2 = g(v);
