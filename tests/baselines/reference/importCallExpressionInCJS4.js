//// [tests/cases/conformance/dynamicImport/importCallExpressionInCJS4.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

//// [2.ts]
async function foo() {
    class C extends (await import("./0")).B {}
    var c = new C();
    c.print();
}
foo();

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class B {
    print() { return "I am B"; }
}
exports.B = B;
//// [2.js]
async function foo() {
    class C extends (await Promise.resolve().then(function () { return require("./0"); })).B {
    }
    var c = new C();
    c.print();
}
foo();
