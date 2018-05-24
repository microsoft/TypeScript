//// [tests/cases/conformance/dynamicImport/importCallExpressionInSystem2.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

//// [2.ts]
// We use Promise<any> for now as there is no way to specify shape of module object
function foo(x: Promise<any>) {
    x.then(value => {
        let b = new value.B();
        b.print();
    })
}

foo(import("./0"));

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
    // We use Promise<any> for now as there is no way to specify shape of module object
    function foo(x) {
        x.then(value => {
            let b = new value.B();
            b.print();
        });
    }
    return {
        setters: [],
        execute: function () {
            foo(context_1.import("./0"));
        }
    };
});
