// @target: es5, es2015
// @module: system

// @filename: a.d.ts
declare var a: number;
export = a;  // OK, in ambient context

// @filename: b.ts
import * as a from "a";
