// @module: es2018
// @target: esnext
// @declaration: true

// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts
import("./0");
var p1 = import("./0");