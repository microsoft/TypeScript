// @module: es2020
// @target: es2020
// @declaration: true

// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts
var p1 = import("./0");
