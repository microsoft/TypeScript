//// [tests/cases/conformance/dynamicImport/importCallExpressionES6System.ts] ////

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
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() { return "foo"; }
    exports_1("foo", foo);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [1.js]
System.register([], function (exports_1, context_1) {
    var p1, p2, C, D;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() {
        const p2 = context_1.import("./0");
    }
    return {
        setters: [],
        execute: function () {
            context_1.import("./0");
            p1 = context_1.import("./0");
            p1.then(zero => {
                return zero.foo();
            });
            exports_1("p2", p2 = context_1.import("./0"));
            C = class C {
                method() {
                    const loadAsync = context_1.import("./0");
                }
            };
            D = class D {
                method() {
                    const loadAsync = context_1.import("./0");
                }
            };
            exports_1("D", D);
        }
    };
});
