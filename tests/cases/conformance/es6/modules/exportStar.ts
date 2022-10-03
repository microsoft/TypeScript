// @module: commonjs
// @target: ES5

// @filename: t1.ts
export var x = 1;
export var y = 2;

// @filename: t2.ts
export default "hello";
export function foo() { }

// @filename: t3.ts
var x = "x";
var y = "y";
var z = "z";
export { x, y, z };

// @filename: t4.ts
export * from "./t1";
export * from "./t2";
export * from "./t3";

// @filename: main.ts
import hello, { x, y, z, foo } from "./t4";
hello;
x;
y;
z;
foo;
