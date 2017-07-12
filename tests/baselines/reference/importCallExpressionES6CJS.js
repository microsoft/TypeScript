//// [tests/cases/conformance/dynamicImport/importCallExpressionES6CJS.ts] ////

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

class C {
    method() {
        const loadAsync = import ("./0");
    }
}

export class D {
    method() {
        const loadAsync = import ("./0");
    }
}

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo() { return "foo"; }
exports.foo = foo;
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(function () { return require("./0"); });
var p1 = Promise.resolve().then(function () { return require("./0"); });
p1.then(zero => {
    return zero.foo();
});
exports.p2 = Promise.resolve().then(function () { return require("./0"); });
function foo() {
    const p2 = Promise.resolve().then(function () { return require("./0"); });
}
class C {
    method() {
        const loadAsync = Promise.resolve().then(function () { return require("./0"); });
    }
}
class D {
    method() {
        const loadAsync = Promise.resolve().then(function () { return require("./0"); });
    }
}
exports.D = D;
