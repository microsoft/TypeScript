//// [tests/cases/compiler/es6ExportAllInEs5.ts] ////

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
export * from "./server";

//// [server.js]
"use strict";
var c = (function () {
    function c() {
    }
    return c;
}());
exports.c = c;
var m;
(function (m) {
    m.x = 10;
})(m = exports.m || (exports.m = {}));
exports.x = 10;
Object.defineProperty(exports, "__esModule", { value: true });
//// [client.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./server"));
Object.defineProperty(exports, "__esModule", { value: true });


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
export * from "./server";
