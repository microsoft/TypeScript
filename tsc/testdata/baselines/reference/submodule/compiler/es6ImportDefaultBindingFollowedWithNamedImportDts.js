//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImportDts.ts] ////

//// [server.ts]
export class a { }
export class x { }
export class m { }
export class a11 { }
export class a12 { }
export class x11 { }

//// [client.ts]
import defaultBinding1, { } from "./server";
import defaultBinding2, { a } from "./server";
export var x1 = new a();
import defaultBinding3, { a11 as b } from "./server";
export var x2 = new b();
import defaultBinding4, { x, a12 as y } from "./server";
export var x4 = new x();
export var x5 = new y();
import defaultBinding5, { x11 as z,  } from "./server";
export var x3 = new z();
import defaultBinding6, { m,  } from "./server";
export var x6 = new m();


//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x11 = exports.a12 = exports.a11 = exports.m = exports.x = exports.a = void 0;
class a {
}
exports.a = a;
class x {
}
exports.x = x;
class m {
}
exports.m = m;
class a11 {
}
exports.a11 = a11;
class a12 {
}
exports.a12 = a12;
class x11 {
}
exports.x11 = x11;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x6 = exports.x3 = exports.x5 = exports.x4 = exports.x2 = exports.x1 = void 0;
const server_1 = require("./server");
exports.x1 = new server_1.a();
const server_2 = require("./server");
exports.x2 = new server_2.a11();
const server_3 = require("./server");
exports.x4 = new server_3.x();
exports.x5 = new server_3.a12();
const server_4 = require("./server");
exports.x3 = new server_4.x11();
const server_5 = require("./server");
exports.x6 = new server_5.m();
