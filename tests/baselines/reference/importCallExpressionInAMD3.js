//// [tests/cases/conformance/dynamicImport/importCallExpressionInAMD3.ts] ////

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
    exports.B = void 0;
    class B {
        print() { return "I am B"; }
    }
    exports.B = B;
});
//// [2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    async function foo() {
        class C extends (await new Promise((resolve_1, reject_1) => { require(["./0"], resolve_1, reject_1); })).B {
        }
        var c = new C();
        c.print();
    }
    foo();
});
