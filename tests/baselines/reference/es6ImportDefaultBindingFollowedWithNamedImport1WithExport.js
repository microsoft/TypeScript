//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImport1WithExport.ts] ////

//// [server.ts]

var a = 10;
export = a;

//// [client.ts]
export import defaultBinding1, { } from "server";
export var x1: number = defaultBinding1;
export import defaultBinding2, { a } from "server";
export var x1: number = defaultBinding2;
export import defaultBinding3, { a as b } from "server";
export var x1: number = defaultBinding3;
export import defaultBinding4, { x, a as y } from "server";
export var x1: number = defaultBinding4;
export import defaultBinding5, { x as z,  } from "server";
export var x1: number = defaultBinding5;
export import defaultBinding6, { m,  } from "server";
export var x1: number = defaultBinding6;


//// [server.js]
var a = 10;
module.exports = a;
//// [client.js]
var defaultBinding1 = require("server");
exports.x1 = defaultBinding1;
var defaultBinding2 = require("server");
exports.x1 = defaultBinding2;
var defaultBinding3 = require("server");
exports.x1 = defaultBinding3;
var defaultBinding4 = require("server");
exports.x1 = defaultBinding4;
var defaultBinding5 = require("server");
exports.x1 = defaultBinding5;
var defaultBinding6 = require("server");
exports.x1 = defaultBinding6;


//// [server.d.ts]
declare var a: number;
export = a;
//// [client.d.ts]
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
