// @target: es6

// @filename: a.ts
var a = 10;
export = a;  // Error: export = not allowed in ES6

// @filename: b.ts
import * as a from "a";
