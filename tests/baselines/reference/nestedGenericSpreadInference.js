//// [tests/cases/compiler/nestedGenericSpreadInference.ts] ////

//// [nestedGenericSpreadInference.ts]
declare function wrap<X>(x: X): { x: X };
declare function call<A extends unknown[], T>(x: { x: (...args: A) => T }, ...args: A): T;

// This should be of type `number` - ideally, it also would not error.
const leak = call(wrap(<T>(x: T) => x), 1);


//// [nestedGenericSpreadInference.js]
"use strict";
// This should be of type `number` - ideally, it also would not error.
var leak = call(wrap(function (x) { return x; }), 1);
