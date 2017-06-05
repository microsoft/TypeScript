//// [tests/cases/conformance/dynamicImport/importCallExpressionWithTypeArgument.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
"use strict"
var p1 = import<Promise<any>>("./0");  // error
var p2 = import<>("./0");  // error
// p1.then(value => {
//     value.anyFunction();
// })

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo() { return "foo"; }
exports.foo = foo;
//// [1.js]
"use strict";
var p1 = (import)("./0"); // error
var p2 = (import)("./0"); // error
