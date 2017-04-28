//// [tests/cases/conformance/es2018/dynamicImport/importCallExpressionInScriptContext2.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
"use strict"
var p1 = import("./0");
function arguments() { }

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo() { return "foo"; }
exports.foo = foo;
//// [1.js]
"use strict";
var __resolved = new Promise(function (resolve) { resolve(); });
var p1 = __resolved.then(function () { return require("./0"); });
function arguments() { }
