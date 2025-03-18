//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImportDts1.ts] ////

//// [server.ts]
class a { }
export default a;

//// [client.ts]
import defaultBinding1, { } from "./server";
export var x1 = new defaultBinding1();
import defaultBinding2, { a } from "./server";
export var x2 = new defaultBinding2();
import defaultBinding3, { a as b } from "./server";
export var x3 = new defaultBinding3();
import defaultBinding4, { x, a as y } from "./server";
export var x4 = new defaultBinding4();
import defaultBinding5, { x as z,  } from "./server";
export var x5 = new defaultBinding5();
import defaultBinding6, { m,  } from "./server";
export var x6 = new defaultBinding6();

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class a {
}
exports.default = a;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x6 = exports.x5 = exports.x4 = exports.x3 = exports.x2 = exports.x1 = void 0;
const server_1 = require("./server");
exports.x1 = new server_1.default();
const server_2 = require("./server");
exports.x2 = new server_2.default();
const server_3 = require("./server");
exports.x3 = new server_3.default();
const server_4 = require("./server");
exports.x4 = new server_4.default();
const server_5 = require("./server");
exports.x5 = new server_5.default();
const server_6 = require("./server");
exports.x6 = new server_6.default();
