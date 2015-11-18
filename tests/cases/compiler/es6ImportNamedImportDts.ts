// @module: commonjs
// @declaration: true

// @filename: server.ts
export class a { }
export class a11 { }
export class a12 { }
export class x { }
export class x11 { }
export class m { }
export class a1 { }
export class x1 { }
export class a111 { }
export class x111 { }
export class z1 { }
export class z2 { }
export class aaaa { }
export class aaaa1 { }

// @filename: client.ts
import { } from "./server";
import { a } from "./server";
export var xxxx = new a();
import { a11 as b } from "./server";
export var xxxx1 = new b();
import { x, a12 as y } from "./server";
export var xxxx2 = new x();
export var xxxx3 = new y();
import { x11 as z,  } from "./server";
export var xxxx4 = new z();
import { m,  } from "./server";
export var xxxx5 = new m();
import { a1, x1 } from "./server";
export var xxxx6 = new a1();
export var xxxx7 = new x1();
import { a111 as a11, x111 as x11 } from "./server";
export var xxxx8 = new a11();
export var xxxx9 = new x11();
import { z1 } from "./server";
export var z111 = new z1();
import { z2 as z3 } from "./server";
export var z2 = new z3(); // z2 shouldn't give redeclare error

// not referenced
import { aaaa } from "./server";
import { aaaa1 as bbbb } from "./server";
