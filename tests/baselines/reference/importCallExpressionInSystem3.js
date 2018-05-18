//// [tests/cases/conformance/dynamicImport/importCallExpressionInSystem3.ts] ////

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
System.register([], function (exports_1, context_1) {
    var B;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            B = class B {
                print() { return "I am B"; }
            };
            exports_1("B", B);
        }
    };
});
//// [2.js]
System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    async function foo() {
        class C extends (await context_1.import("./0")).B {
        }
        var c = new C();
        c.print();
    }
    return {
        setters: [],
        execute: function () {
            foo();
        }
    };
});
