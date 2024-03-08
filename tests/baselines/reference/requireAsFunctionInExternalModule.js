//// [tests/cases/compiler/requireAsFunctionInExternalModule.ts] ////

//// [c.js]
export default function require(a) { }
export function has(a) { return true }

//// [m.js]
import require, { has } from "./c"
export function hello() { }
if (has('ember-debug')) {
    require('ember-debug');
}

//// [m2.ts]
import { hello } from "./m";
hello();


//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = require;
exports.has = has;
function require(a) { }
function has(a) { return true; }
//// [m.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = hello;
var c_1 = require("./c");
function hello() { }
if ((0, c_1.has)('ember-debug')) {
    (0, c_1.default)('ember-debug');
}
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m_1 = require("./m");
(0, m_1.hello)();
