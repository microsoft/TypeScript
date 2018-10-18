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
            (function (A) {
                var B;
                (function (B) {
                    var C;
                    (function (C) {
                        function foo() { }
                        C.foo = foo;
                    })(C = B.C || (B.C = {}));
                })(B = A.B || (A.B = {}));
            })(A || (A = {}));
            exports_1("A", A);
        }
    };
});
