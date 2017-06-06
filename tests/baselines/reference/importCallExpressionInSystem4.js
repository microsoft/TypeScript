//// [tests/cases/conformance/dynamicImport/importCallExpressionInSystem4.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

export function foo() { return "foo" }

//// [1.ts]
export function backup() { return "backup"; }

//// [2.ts]
declare var console: any;
class C {
    private myModule = import("./0");
    method() {
        this.myModule.then(Zero => {
            console.log(Zero.foo());
        }, async err => {
            console.log(err);
            let one = await import("./1");
            console.log(one.backup());
        });
    }
}

//// [0.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() { return "foo"; }
    exports_1("foo", foo);
    var B;
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
//// [1.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function backup() { return "backup"; }
    exports_1("backup", backup);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [2.js]
System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var C;
    return {
        setters: [],
        execute: function () {
            C = class C {
                constructor() {
                    this.myModule = context_1.import("./0");
                }
                method() {
                    this.myModule.then(Zero => {
                        console.log(Zero.foo());
                    }, async (err) => {
                        console.log(err);
                        let one = await context_1.import("./1");
                        console.log(one.backup());
                    });
                }
            };
        }
    };
});
