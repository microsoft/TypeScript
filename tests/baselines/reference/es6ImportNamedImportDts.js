//// [tests/cases/compiler/es6ImportNamedImportDts.ts] ////

//// [server.ts]
export class a { }
export class a11 { }
export class a12 { }
export class x { }
export class x11 { }
export class m { }
export class a1 { }
export class x1 { }
export class a111 { }
export class x111 { }
export class z1 { }
export class z2 { }
export class aaaa { }
export class aaaa1 { }

//// [client.ts]
import { } from "./server";
import { a } from "./server";
export var xxxx = new a();
import { a11 as b } from "./server";
export var xxxx1 = new b();
import { x, a12 as y } from "./server";
export var xxxx2 = new x();
export var xxxx3 = new y();
import { x11 as z,  } from "./server";
export var xxxx4 = new z();
import { m,  } from "./server";
export var xxxx5 = new m();
import { a1, x1 } from "./server";
export var xxxx6 = new a1();
export var xxxx7 = new x1();
import { a111 as a11, x111 as x11 } from "./server";
export var xxxx8 = new a11();
export var xxxx9 = new x11();
import { z1 } from "./server";
export var z111 = new z1();
import { z2 as z3 } from "./server";
export var z2 = new z3(); // z2 shouldn't give redeclare error

// not referenced
import { aaaa } from "./server";
import { aaaa1 as bbbb } from "./server";


//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aaaa1 = exports.aaaa = exports.z2 = exports.z1 = exports.x111 = exports.a111 = exports.x1 = exports.a1 = exports.m = exports.x11 = exports.x = exports.a12 = exports.a11 = exports.a = void 0;
var a = /** @class */ (function () {
    function a() {
    }
    return a;
}());
exports.a = a;
var a11 = /** @class */ (function () {
    function a11() {
    }
    return a11;
}());
exports.a11 = a11;
var a12 = /** @class */ (function () {
    function a12() {
    }
    return a12;
}());
exports.a12 = a12;
var x = /** @class */ (function () {
    function x() {
    }
    return x;
}());
exports.x = x;
var x11 = /** @class */ (function () {
    function x11() {
    }
    return x11;
}());
exports.x11 = x11;
var m = /** @class */ (function () {
    function m() {
    }
    return m;
}());
exports.m = m;
var a1 = /** @class */ (function () {
    function a1() {
    }
    return a1;
}());
exports.a1 = a1;
var x1 = /** @class */ (function () {
    function x1() {
    }
    return x1;
}());
exports.x1 = x1;
var a111 = /** @class */ (function () {
    function a111() {
    }
    return a111;
}());
exports.a111 = a111;
var x111 = /** @class */ (function () {
    function x111() {
    }
    return x111;
}());
exports.x111 = x111;
var z1 = /** @class */ (function () {
    function z1() {
    }
    return z1;
}());
exports.z1 = z1;
var z2 = /** @class */ (function () {
    function z2() {
    }
    return z2;
}());
exports.z2 = z2;
var aaaa = /** @class */ (function () {
    function aaaa() {
    }
    return aaaa;
}());
exports.aaaa = aaaa;
var aaaa1 = /** @class */ (function () {
    function aaaa1() {
    }
    return aaaa1;
}());
exports.aaaa1 = aaaa1;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z2 = exports.z111 = exports.xxxx9 = exports.xxxx8 = exports.xxxx7 = exports.xxxx6 = exports.xxxx5 = exports.xxxx4 = exports.xxxx3 = exports.xxxx2 = exports.xxxx1 = exports.xxxx = void 0;
var server_1 = require("./server");
exports.xxxx = new server_1.a();
var server_2 = require("./server");
exports.xxxx1 = new server_2.a11();
var server_3 = require("./server");
exports.xxxx2 = new server_3.x();
exports.xxxx3 = new server_3.a12();
var server_4 = require("./server");
exports.xxxx4 = new server_4.x11();
var server_5 = require("./server");
exports.xxxx5 = new server_5.m();
var server_6 = require("./server");
exports.xxxx6 = new server_6.a1();
exports.xxxx7 = new server_6.x1();
var server_7 = require("./server");
exports.xxxx8 = new server_7.a111();
exports.xxxx9 = new server_7.x111();
var server_8 = require("./server");
exports.z111 = new server_8.z1();
var server_9 = require("./server");
exports.z2 = new server_9.z2(); // z2 shouldn't give redeclare error


//// [server.d.ts]
export declare class a {
}
export declare class a11 {
}
export declare class a12 {
}
export declare class x {
}
export declare class x11 {
}
export declare class m {
}
export declare class a1 {
}
export declare class x1 {
}
export declare class a111 {
}
export declare class x111 {
}
export declare class z1 {
}
export declare class z2 {
}
export declare class aaaa {
}
export declare class aaaa1 {
}
//// [client.d.ts]
import { a } from "./server";
export declare var xxxx: a;
import { a11 as b } from "./server";
export declare var xxxx1: b;
import { x, a12 as y } from "./server";
export declare var xxxx2: x;
export declare var xxxx3: y;
import { x11 as z } from "./server";
export declare var xxxx4: z;
import { m } from "./server";
export declare var xxxx5: m;
import { a1, x1 } from "./server";
export declare var xxxx6: a1;
export declare var xxxx7: x1;
import { a111 as a11, x111 as x11 } from "./server";
export declare var xxxx8: a11;
export declare var xxxx9: x11;
import { z1 } from "./server";
export declare var z111: z1;
import { z2 as z3 } from "./server";
export declare var z2: z3;
