// @target: es6
// @module: commonjs

// @filename: es6ImportNamedImport_0.ts
export var a = 10;
export var x = a;
export var m = a;
export var a1 = 10;
export var x1 = 10;
export var z1 = 10;
export var z2 = 10;

// @filename: es6ImportNamedImport_1.ts
import { } from "es6ImportNamedImport_0";
import { a } from "es6ImportNamedImport_0";
import { a as b } from "es6ImportNamedImport_0";
import { x, a as y } from "es6ImportNamedImport_0";
import { x as z,  } from "es6ImportNamedImport_0";
import { m,  } from "es6ImportNamedImport_0";
import { a1, x1 } from "es6ImportNamedImport_0";
import { a1 as a11, x1 as x11 } from "es6ImportNamedImport_0";
import { z1 } from "es6ImportNamedImport_0";
var z111 = z1;
import { z2 as z3 } from "es6ImportNamedImport_0";
var z2 = z3; // z2 shouldn't give redeclare error