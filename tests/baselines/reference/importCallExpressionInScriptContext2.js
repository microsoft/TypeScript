//// [tests/cases/conformance/dynamicImport/importCallExpressionInScriptContext2.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
"use strict"
var p1 = import("./0");
function arguments() { }

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { return "foo"; }
//// [1.js]
"use strict";
var p1 = Promise.resolve().then(() => require("./0"));
function arguments() { }
