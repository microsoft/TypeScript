//// [tests/cases/compiler/es6ImportNamedImport.ts] ////

//// [es6ImportNamedImport_0.ts]

export var a = 10;
export var x = a;
export var m = a;
export var a1 = 10;
export var x1 = 10;
export var z1 = 10;
export var z2 = 10;
export var aaaa = 10;

//// [es6ImportNamedImport_1.ts]
import { } from "es6ImportNamedImport_0";
import { a } from "es6ImportNamedImport_0";
var xxxx = a;
import { a as b } from "es6ImportNamedImport_0";
var xxxx = b;
import { x, a as y } from "es6ImportNamedImport_0";
var xxxx = x;
var xxxx = y;
import { x as z,  } from "es6ImportNamedImport_0";
var xxxx = z;
import { m,  } from "es6ImportNamedImport_0";
var xxxx = m;
import { a1, x1 } from "es6ImportNamedImport_0";
var xxxx = a1;
var xxxx = x1;
import { a1 as a11, x1 as x11 } from "es6ImportNamedImport_0";
var xxxx = a11;
var xxxx = x11;
import { z1 } from "es6ImportNamedImport_0";
var z111 = z1;
import { z2 as z3 } from "es6ImportNamedImport_0";
var z2 = z3; // z2 shouldn't give redeclare error

// These are elided
import { aaaa } from "es6ImportNamedImport_0";
// These are elided
import { aaaa as bbbb } from "es6ImportNamedImport_0";


//// [es6ImportNamedImport_0.js]
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
exports.a1 = 10;
exports.x1 = 10;
exports.z1 = 10;
exports.z2 = 10;
exports.aaaa = 10;
//// [es6ImportNamedImport_1.js]
import { a } from "es6ImportNamedImport_0";
var xxxx = a;
import { a as b } from "es6ImportNamedImport_0";
var xxxx = b;
import { x, a as y } from "es6ImportNamedImport_0";
var xxxx = x;
var xxxx = y;
import { x as z } from "es6ImportNamedImport_0";
var xxxx = z;
import { m } from "es6ImportNamedImport_0";
var xxxx = m;
import { a1, x1 } from "es6ImportNamedImport_0";
var xxxx = a1;
var xxxx = x1;
import { a1 as a11, x1 as x11 } from "es6ImportNamedImport_0";
var xxxx = a11;
var xxxx = x11;
import { z1 } from "es6ImportNamedImport_0";
var z111 = z1;
import { z2 as z3 } from "es6ImportNamedImport_0";
var z2 = z3; // z2 shouldn't give redeclare error


//// [es6ImportNamedImport_0.d.ts]
export declare var a: number;
export declare var x: number;
export declare var m: number;
export declare var a1: number;
export declare var x1: number;
export declare var z1: number;
export declare var z2: number;
export declare var aaaa: number;
//// [es6ImportNamedImport_1.d.ts]
