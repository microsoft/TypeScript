//// [tests/cases/conformance/dynamicImport/importCallExpressionInCJS1.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
import("./0");
var p1 = import("./0");
p1.then(zero => {
    return zero.foo();
});

export var p2 = import("./0");

function foo() {
    const p2 = import("./0");
}

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { return "foo"; }
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p2 = void 0;
Promise.resolve().then(() => require("./0"));
var p1 = Promise.resolve().then(() => require("./0"));
p1.then(zero => {
    return zero.foo();
});
exports.p2 = Promise.resolve().then(() => require("./0"));
function foo() {
    const p2 = Promise.resolve().then(() => require("./0"));
}
