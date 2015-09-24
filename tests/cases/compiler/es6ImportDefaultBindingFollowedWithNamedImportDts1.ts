// @module: commonjs
// @declaration: true
// @target: ES5

// @filename: server.ts
class a { }
export default a;

// @filename: client.ts
import defaultBinding1, { } from "./server";
export var x1 = new defaultBinding1();
import defaultBinding2, { a } from "./server";
export var x2 = new defaultBinding2();
import defaultBinding3, { a as b } from "./server";
export var x3 = new defaultBinding3();
import defaultBinding4, { x, a as y } from "./server";
export var x4 = new defaultBinding4();
import defaultBinding5, { x as z,  } from "./server";
export var x5 = new defaultBinding5();
import defaultBinding6, { m,  } from "./server";
export var x6 = new defaultBinding6();