//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImportWithExport.ts] ////

//// [server.ts]
export var a = 10;
export var x = a;
export var m = a;
export default {};

//// [client.ts]
export import defaultBinding1, { } from "./server";
export import defaultBinding2, { a } from "./server";
export var x1: number = a;
export import defaultBinding3, { a as b } from "./server";
export var x1: number = b;
export import defaultBinding4, { x, a as y } from "./server";
export var x1: number = x;
export var x1: number = y;
export import defaultBinding5, { x as z,  } from "./server";
export var x1: number = z;
export import defaultBinding6, { m,  } from "./server";
export var x1: number = m;


//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = exports.x = exports.a = void 0;
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
exports.default = {};
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x1 = void 0;
var server_1 = require("./server");
exports.x1 = server_1.a;
var server_2 = require("./server");
exports.x1 = server_2.a;
var server_3 = require("./server");
exports.x1 = server_3.x;
exports.x1 = server_3.a;
var server_4 = require("./server");
exports.x1 = server_4.x;
var server_5 = require("./server");
exports.x1 = server_5.m;


//// [server.d.ts]
export declare var a: number;
export declare var x: number;
export declare var m: number;
declare const _default: {};
export default _default;
//// [client.d.ts]
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
