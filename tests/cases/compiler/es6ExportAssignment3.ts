// @target: es6

// @filename: a.d.ts
declare var a: number;
export = a;  // OK, in ambient context

// @filename: b.ts
import * as a from "a";
