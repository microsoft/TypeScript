//// [tests/cases/conformance/dynamicImport/importCallExpressionInScriptContext1.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
var p1 = import("./0");
function arguments() { } // this is allow as the file doesn't have implicit "use strict"

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { return "foo"; }
//// [1.js]
var p1 = Promise.resolve().then(() => require("./0"));
function arguments() { } // this is allow as the file doesn't have implicit "use strict"
