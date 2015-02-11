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
var _a = require("server");
var a = _a.a;
exports.xxxx = new a();
var _b = require("server");
var b = _b.a11;
exports.xxxx1 = new b();
var _c = require("server");
var x = _c.x;
var y = _c.a12;
exports.xxxx2 = new x();
exports.xxxx3 = new y();
var _d = require("server");
var z = _d.x11;
exports.xxxx4 = new z();
var _e = require("server");
var m = _e.m;
exports.xxxx5 = new m();
var _f = require("server");
var a1 = _f.a1;
var x1 = _f.x1;
exports.xxxx6 = new a1();
exports.xxxx7 = new x1();
var _g = require("server");
var a11 = _g.a111;
var x11 = _g.x111;
exports.xxxx8 = new a11();
exports.xxxx9 = new x11();
var _h = require("server");
var z1 = _h.z1;
exports.z111 = new z1();
var _j = require("server");
var z3 = _j.z2;
exports.z2 = new z3(); // z2 shouldn't give redeclare error


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
