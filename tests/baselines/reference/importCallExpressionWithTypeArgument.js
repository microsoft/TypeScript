//// [tests/cases/conformance/dynamicImport/importCallExpressionWithTypeArgument.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
"use strict"
var p1 = import<Promise<any>>("./0");  // error
var p2 = import<>("./0");  // error

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { return "foo"; }
//// [1.js]
"use strict";
var p1 = Promise.resolve().then(() => require("./0")); // error
var p2 = Promise.resolve().then(() => require("./0")); // error
