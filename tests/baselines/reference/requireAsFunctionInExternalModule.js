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
exports.__esModule = true;
exports.has = void 0;
function require(a) { }
exports["default"] = require;
function has(a) { return true; }
exports.has = has;
//// [m.js]
"use strict";
exports.__esModule = true;
exports.hello = void 0;
var c_1 = require("./c");
function hello() { }
exports.hello = hello;
if ((0, c_1.has)('ember-debug')) {
    (0, c_1["default"])('ember-debug');
}
//// [m2.js]
"use strict";
exports.__esModule = true;
var m_1 = require("./m");
(0, m_1.hello)();
