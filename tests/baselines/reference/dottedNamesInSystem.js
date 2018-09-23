//// [dottedNamesInSystem.ts]
export namespace A.B.C {
    export function foo() {}
}

export function bar() {
    return A.B.C.foo();
}

//// [dottedNamesInSystem.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var A;
    var __moduleName = context_1 && context_1.id;
    function bar() {
        return A.B.C.foo();
    }
    exports_1("bar", bar);
    return {
        setters: [],
        execute: function () {
            exports_1("A", A = {});
            (function (A) {
                var B = A.B || (A.B = {});
                (function (B) {
                    var C = B.C || (B.C = {});
                    (function (C) {
                        function foo() { }
                        C.foo = foo;
                    })(C);
                })(B);
            })(A);
        }
    };
});
