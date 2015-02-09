//// [tests/cases/compiler/es6ImportNamedImportWithExport.ts] ////

//// [server.ts]

export var a = 10;
export var x = a;
export var m = a;
export var a1 = 10;
export var x1 = 10;
export var z1 = 10;
export var z2 = 10;
export var aaaa = 10;

//// [client.ts]
export import { } from "server";
export import { a } from "server";
export var xxxx = a;
export import { a as b } from "server";
export var xxxx = b;
export import { x, a as y } from "server";
export var xxxx = x;
export var xxxx = y;
export import { x as z,  } from "server";
export var xxxx = z;
export import { m,  } from "server";
export var xxxx = m;
export import { a1, x1 } from "server";
export var xxxx = a1;
export var xxxx = x1;
export import { a1 as a11, x1 as x11 } from "server";
export var xxxx = a11;
export var xxxx = x11;
export import { z1 } from "server";
export var z111 = z1;
export import { z2 as z3 } from "server";
export var z2 = z3; // z2 shouldn't give redeclare error

// Non referenced imports
export import { aaaa } from "server";
export import { aaaa as bbbb } from "server";


//// [server.js]
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
exports.a1 = 10;
exports.x1 = 10;
exports.z1 = 10;
exports.z2 = 10;
exports.aaaa = 10;
//// [client.js]
var _a = require("server");
var a = _a.a;
exports.xxxx = a;
var _b = require("server");
var b = _b.a;
exports.xxxx = b;
var _c = require("server");
var x = _c.x;
var y = _c.a;
exports.xxxx = x;
exports.xxxx = y;
var _d = require("server");
var z = _d.x;
exports.xxxx = z;
var _e = require("server");
var m = _e.m;
exports.xxxx = m;
var _f = require("server");
var a1 = _f.a1;
var x1 = _f.x1;
exports.xxxx = a1;
exports.xxxx = x1;
var _g = require("server");
var a11 = _g.a1;
var x11 = _g.x1;
exports.xxxx = a11;
exports.xxxx = x11;
var _h = require("server");
var z1 = _h.z1;
exports.z111 = z1;
var _j = require("server");
var z3 = _j.z2;
exports.z2 = z3; // z2 shouldn't give redeclare error


//// [server.d.ts]
export declare var a: number;
export declare var x: number;
export declare var m: number;
export declare var a1: number;
export declare var x1: number;
export declare var z1: number;
export declare var z2: number;
export declare var aaaa: number;
//// [client.d.ts]
export declare var xxxx: number;
export declare var xxxx: number;
export declare var xxxx: number;
export declare var xxxx: number;
export declare var xxxx: number;
export declare var xxxx: number;
export declare var xxxx: number;
export declare var xxxx: number;
export declare var xxxx: number;
export declare var xxxx: number;
export declare var z111: number;
export declare var z2: number;
