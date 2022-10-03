//// [discriminatedUnionInference.ts]
// Repro from #28862

type Foo<A> = { type: "foo", (): A[] };
type Bar<A> = { type: "bar", (): A };

type FooBar<A> = Foo<A> | Bar<A>;

type InferA<T> = T extends FooBar<infer A> ? A : never;

type FooA = InferA<Foo<number>>;  // number

// Repro from #28862

type Item<T> = { kind: 'a', data: T } | { kind: 'b', data: T[] };

declare function foo<T>(item: Item<T>): T;

let x1 = foo({ kind: 'a', data: 42 });  // number
let x2 = foo({ kind: 'b', data: [1, 2] });  // number


//// [discriminatedUnionInference.js]
"use strict";
// Repro from #28862
var x1 = foo({ kind: 'a', data: 42 }); // number
var x2 = foo({ kind: 'b', data: [1, 2] }); // number
