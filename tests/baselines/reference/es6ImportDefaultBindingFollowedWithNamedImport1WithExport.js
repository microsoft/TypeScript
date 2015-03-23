//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImport1WithExport.ts] ////

//// [server.ts]

var a = 10;
export default a;

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
exports.default = a;
//// [client.js]
var _server = require("server");
exports.x1 = _server.default;
var _server_1 = require("server");
exports.x1 = _server_1.default;
var _server_2 = require("server");
exports.x1 = _server_2.default;
var _server_3 = require("server");
exports.x1 = _server_3.default;
var _server_4 = require("server");
exports.x1 = _server_4.default;
var _server_5 = require("server");
exports.x1 = _server_5.default;


//// [server.d.ts]
declare var a: number;
export default a;
//// [client.d.ts]
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
