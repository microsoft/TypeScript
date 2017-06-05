// @module: commonjs
// @target: es6
// @noImplicitAny: false

// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts
"use strict"
var p1 = import<Promise<any>>("./0");  // error
var p2 = import<>("./0");  // error
// p1.then(value => {
//     value.anyFunction();
// })