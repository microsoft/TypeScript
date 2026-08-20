// @target: es6
// @module: commonjs
// @declaration: true

// @filename: es6ImportNamedImport_0.ts
export var a = 10;
export var x = a;
export var m = a;
export var a1 = 10;
export var x1 = 10;
export var z1 = 10;
export var z2 = 10;
export var aaaa = 10;

// @filename: es6ImportNamedImport_1.ts
import { } from "./es6ImportNamedImport_0";
import { a } from "./es6ImportNamedImport_0";
var xxxx = a;
import { a as b } from "./es6ImportNamedImport_0";
var xxxx = b;
import { x, a as y } from "./es6ImportNamedImport_0";
var xxxx = x;
var xxxx = y;
import { x as z,  } from "./es6ImportNamedImport_0";
var xxxx = z;
import { m,  } from "./es6ImportNamedImport_0";
var xxxx = m;
import { a1, x1 } from "./es6ImportNamedImport_0";
var xxxx = a1;
var xxxx = x1;
import { a1 as a11, x1 as x11 } from "./es6ImportNamedImport_0";
var xxxx = a11;
var xxxx = x11;
import { z1 } from "./es6ImportNamedImport_0";
var z111 = z1;
import { z2 as z3 } from "./es6ImportNamedImport_0";
var z2 = z3; // z2 shouldn't give redeclare error

// These are elided
import { aaaa } from "./es6ImportNamedImport_0";
// These are elided
import { aaaa as bbbb } from "./es6ImportNamedImport_0";
