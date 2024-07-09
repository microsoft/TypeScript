// @module: commonjs
// @target: es6
// @noImplicitAny: false

// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts
"use strict"
var p1 = import("./0");
function arguments() { }