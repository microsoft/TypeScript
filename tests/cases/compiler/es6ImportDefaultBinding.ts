// @target: es6
// @module: commonjs

// @filename: es6ImportDefaultBinding_0.ts
var a = 10;
export = a;

// @filename: es6ImportDefaultBinding_1.ts
import defaultBinding from "es6ImportDefaultBinding_0";
var x = defaultBinding;