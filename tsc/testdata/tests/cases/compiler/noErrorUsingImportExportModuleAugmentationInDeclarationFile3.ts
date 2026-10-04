// @target: es5, es2015
// @module: none

// @filename: 0.d.ts
export = a;
declare var a: number;

// @filename: 1.ts
export var j = "hello";  // error
