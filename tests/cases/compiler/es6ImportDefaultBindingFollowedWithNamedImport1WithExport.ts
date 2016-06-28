// @module: commonjs
// @declaration: true
// @target: ES5

// @filename: server.ts
var a = 10;
export default a;

// @filename: client.ts
export import defaultBinding1, { } from "./server";
export var x1: number = defaultBinding1;
export import defaultBinding2, { a } from "./server";
export var x1: number = defaultBinding2;
export import defaultBinding3, { a as b } from "./server";
export var x1: number = defaultBinding3;
export import defaultBinding4, { x, a as y } from "./server";
export var x1: number = defaultBinding4;
export import defaultBinding5, { x as z,  } from "./server";
export var x1: number = defaultBinding5;
export import defaultBinding6, { m,  } from "./server";
export var x1: number = defaultBinding6;
