//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImportWithExport.ts] ////

//// [server.ts]

export var a = 10;
export var x = a;
export var m = a;

//// [client.ts]
export import defaultBinding1, { } from "server";
export import defaultBinding2, { a } from "server";
export var x1: number = a;
export import defaultBinding3, { a as b } from "server";
export var x1: number = b;
export import defaultBinding4, { x, a as y } from "server";
export var x1: number = x;
export var x1: number = y;
export import defaultBinding5, { x as z,  } from "server";
export var x1: number = z;
export import defaultBinding6, { m,  } from "server";
export var x1: number = m;


//// [server.js]
define(["require", "exports"], function (require, exports) {
    exports.a = 10;
    exports.x = exports.a;
    exports.m = exports.a;
});
//// [client.js]
define(["require", "exports", "server", "server", "server", "server", "server"], function (require, exports, defaultBinding2, defaultBinding3, defaultBinding4, defaultBinding5, defaultBinding6) {
    exports.x1 = a;
    exports.x1 = b;
    exports.x1 = x;
    exports.x1 = y;
    exports.x1 = z;
    exports.x1 = m;
});


//// [server.d.ts]
export declare var a: number;
export declare var x: number;
export declare var m: number;
//// [client.d.ts]
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
export declare var x1: number;
