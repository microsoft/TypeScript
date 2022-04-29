// @module: commonjs
// @declaration: true

// @filename: server.ts
export class a { }
export class x { }
export class m { }
export class a11 { }
export class a12 { }
export class x11 { }

// @filename: client.ts
import defaultBinding1, { } from "./server";
import defaultBinding2, { a } from "./server";
export var x1 = new a();
import defaultBinding3, { a11 as b } from "./server";
export var x2 = new b();
import defaultBinding4, { x, a12 as y } from "./server";
export var x4 = new x();
export var x5 = new y();
import defaultBinding5, { x11 as z,  } from "./server";
export var x3 = new z();
import defaultBinding6, { m,  } from "./server";
export var x6 = new m();
