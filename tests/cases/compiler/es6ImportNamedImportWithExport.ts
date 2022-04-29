// @module: commonjs
// @declaration: true

// @filename: server.ts
export var a = 10;
export var x = a;
export var m = a;
export var a1 = 10;
export var x1 = 10;
export var z1 = 10;
export var z2 = 10;
export var aaaa = 10;

// @filename: client.ts
export import { } from "./server";
export import { a } from "./server";
export var xxxx = a;
export import { a as b } from "./server";
export var xxxx = b;
export import { x, a as y } from "./server";
export var xxxx = x;
export var xxxx = y;
export import { x as z,  } from "./server";
export var xxxx = z;
export import { m,  } from "./server";
export var xxxx = m;
export import { a1, x1 } from "./server";
export var xxxx = a1;
export var xxxx = x1;
export import { a1 as a11, x1 as x11 } from "./server";
export var xxxx = a11;
export var xxxx = x11;
export import { z1 } from "./server";
export var z111 = z1;
export import { z2 as z3 } from "./server";
export var z2 = z3; // z2 shouldn't give redeclare error

// Non referenced imports
export import { aaaa } from "./server";
export import { aaaa as bbbb } from "./server";
