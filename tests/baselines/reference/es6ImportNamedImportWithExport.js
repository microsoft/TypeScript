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


//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aaaa = exports.z2 = exports.z1 = exports.x1 = exports.a1 = exports.m = exports.x = exports.a = void 0;
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
exports.a1 = 10;
exports.x1 = 10;
exports.z1 = 10;
exports.z2 = 10;
exports.aaaa = 10;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z2 = exports.z111 = exports.xxxx = void 0;
var server_1 = require("./server");
exports.xxxx = server_1.a;
var server_2 = require("./server");
exports.xxxx = server_2.a;
var server_3 = require("./server");
exports.xxxx = server_3.x;
exports.xxxx = server_3.a;
var server_4 = require("./server");
exports.xxxx = server_4.x;
var server_5 = require("./server");
exports.xxxx = server_5.m;
var server_6 = require("./server");
exports.xxxx = server_6.a1;
exports.xxxx = server_6.x1;
var server_7 = require("./server");
exports.xxxx = server_7.a1;
exports.xxxx = server_7.x1;
var server_8 = require("./server");
exports.z111 = server_8.z1;
var server_9 = require("./server");
exports.z2 = server_9.z2; // z2 shouldn't give redeclare error


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
