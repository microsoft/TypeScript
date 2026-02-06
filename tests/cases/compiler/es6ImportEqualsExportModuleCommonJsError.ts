// @target: es2015
// @module: commonjs

// @filename: a.ts
class a { }
export = a;

// @filename: main.ts
import * as a from "./a";
a;


