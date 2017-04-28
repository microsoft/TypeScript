//// [tests/cases/conformance/es2018/dynamicImport/importCallExpressionInAMD3.ts] ////

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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class B {
        print() { return "I am B"; }
    }
    exports.B = B;
});
//// [2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    async function foo() {
        class C extends (await new Promise(function (_a, _b) { require(["./0"], _a, _b); })).B {
        }
        var c = new C();
        c.print();
    }
    foo();
});
