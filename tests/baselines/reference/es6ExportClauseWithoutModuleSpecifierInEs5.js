//// [tests/cases/compiler/es6ExportClauseWithoutModuleSpecifierInEs5.ts] ////

//// [server.ts]

export class c {
}
export interface i {
}
export module m {
    export var x = 10;
}
export var x = 10;
export module uninstantiated {
}

//// [client.ts]
export { c } from "server";
export { c as c2 } from "server";
export { i, m as instantiatedModule } from "server";
export { uninstantiated } from "server";
export { x } from "server";

//// [server.js]
var c = (function () {
    function c() {
    }
    return c;
})();
exports.c = c;
var m;
(function (m) {
    m.x = 10;
})(m = exports.m || (exports.m = {}));
exports.x = 10;
//// [client.js]
var _server = require("server");
exports.c = _server.c;
var _server_1 = require("server");
exports.c2 = _server_1.c;
var _server_2 = require("server");
exports.i = _server_2.i;
exports.instantiatedModule = _server_2.m;
var _server_3 = require("server");
exports.uninstantiated = _server_3.uninstantiated;
var _server_4 = require("server");
exports.x = _server_4.x;


//// [server.d.ts]
export declare class c {
}
export interface i {
}
export declare module m {
    var x: number;
}
export declare var x: number;
export declare module uninstantiated {
}
//// [client.d.ts]
export { c } from "server";
export { c as c2 } from "server";
export { i, m as instantiatedModule } from "server";
export { uninstantiated } from "server";
export { x } from "server";
