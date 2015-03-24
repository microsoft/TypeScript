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
import { } from "server";
import { a } from "server";
export var xxxx = new a();
import { a11 as b } from "server";
export var xxxx1 = new b();
import { x, a12 as y } from "server";
export var xxxx2 = new x();
export var xxxx3 = new y();
import { x11 as z,  } from "server";
export var xxxx4 = new z();
import { m,  } from "server";
export var xxxx5 = new m();
import { a1, x1 } from "server";
export var xxxx6 = new a1();
export var xxxx7 = new x1();
import { a111 as a11, x111 as x11 } from "server";
export var xxxx8 = new a11();
export var xxxx9 = new x11();
import { z1 } from "server";
export var z111 = new z1();
import { z2 as z3 } from "server";
export var z2 = new z3(); // z2 shouldn't give redeclare error

// not referenced
import { aaaa } from "server";
import { aaaa1 as bbbb } from "server";


//// [server.js]
var a = (function () {
    function a() {
    }
    return a;
})();
exports.a = a;
var a11 = (function () {
    function a11() {
    }
    return a11;
})();
exports.a11 = a11;
var a12 = (function () {
    function a12() {
    }
    return a12;
})();
exports.a12 = a12;
var x = (function () {
    function x() {
    }
    return x;
})();
exports.x = x;
var x11 = (function () {
    function x11() {
    }
    return x11;
})();
exports.x11 = x11;
var m = (function () {
    function m() {
    }
    return m;
})();
exports.m = m;
var a1 = (function () {
    function a1() {
    }
    return a1;
})();
exports.a1 = a1;
var x1 = (function () {
    function x1() {
    }
    return x1;
})();
exports.x1 = x1;
var a111 = (function () {
    function a111() {
    }
    return a111;
})();
exports.a111 = a111;
var x111 = (function () {
    function x111() {
    }
    return x111;
})();
exports.x111 = x111;
var z1 = (function () {
    function z1() {
    }
    return z1;
})();
exports.z1 = z1;
var z2 = (function () {
    function z2() {
    }
    return z2;
})();
exports.z2 = z2;
var aaaa = (function () {
    function aaaa() {
    }
    return aaaa;
})();
exports.aaaa = aaaa;
var aaaa1 = (function () {
    function aaaa1() {
    }
    return aaaa1;
})();
exports.aaaa1 = aaaa1;
//// [client.js]
var _server_1 = require("server");
exports.xxxx = new _server_1.a();
var _server_2 = require("server");
exports.xxxx1 = new _server_2.a11();
var _server_3 = require("server");
exports.xxxx2 = new _server_3.x();
exports.xxxx3 = new _server_3.a12();
var _server_4 = require("server");
exports.xxxx4 = new _server_4.x11();
var _server_5 = require("server");
exports.xxxx5 = new _server_5.m();
var _server_6 = require("server");
exports.xxxx6 = new _server_6.a1();
exports.xxxx7 = new _server_6.x1();
var _server_7 = require("server");
exports.xxxx8 = new _server_7.a111();
exports.xxxx9 = new _server_7.x111();
var _server_8 = require("server");
exports.z111 = new _server_8.z1();
var _server_9 = require("server");
exports.z2 = new _server_9.z2(); // z2 shouldn't give redeclare error


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
import { a } from "server";
export declare var xxxx: a;
import { a11 as b } from "server";
export declare var xxxx1: b;
import { x, a12 as y } from "server";
export declare var xxxx2: x;
export declare var xxxx3: y;
import { x11 as z } from "server";
export declare var xxxx4: z;
import { m } from "server";
export declare var xxxx5: m;
import { a1, x1 } from "server";
export declare var xxxx6: a1;
export declare var xxxx7: x1;
import { a111 as a11, x111 as x11 } from "server";
export declare var xxxx8: a11;
export declare var xxxx9: x11;
import { z1 } from "server";
export declare var z111: z1;
import { z2 as z3 } from "server";
export declare var z2: z3;
