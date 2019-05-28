//// [mappedTypeAliasSubstitutability.ts]
// repro from https://github.com/microsoft/TypeScript/issues/31616

const v = { test: { smth: 5 } };
type Field<A extends string, R> = { [K in A]: R };
const f = <A extends string, B extends string, R>(x: { [K in A]: Field<B, R> } ): R => ({} as any);
const g = <A extends string, B extends string, R>(x: Field<A, Field<B, R>>): R => ({} as any);
const r1 = f(v); // number
const r2 = g(v); // unknown


//// [mappedTypeAliasSubstitutability.js]
// repro from https://github.com/microsoft/TypeScript/issues/31616
var v = { test: { smth: 5 } };
var f = function (x) { return ({}); };
var g = function (x) { return ({}); };
var r1 = f(v); // number
var r2 = g(v); // unknown
