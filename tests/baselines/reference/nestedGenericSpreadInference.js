//// [tests/cases/compiler/nestedGenericSpreadInference.ts] ////

//// [nestedGenericSpreadInference.ts]
declare function wrap<X>(x: X): { x: X };
declare function call<A extends unknown[], T>(x: { x: (...args: A) => T }, ...args: A): T;

const leak = call(wrap(<T>(x: T) => x), 1);


//// [nestedGenericSpreadInference.js]
"use strict";
var leak = call(wrap(function (x) { return x; }), 1);
