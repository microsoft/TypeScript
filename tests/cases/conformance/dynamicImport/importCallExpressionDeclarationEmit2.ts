// @module: esnext
// @target: esnext
// @declaration: true

// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts
var p1 = import("./0");