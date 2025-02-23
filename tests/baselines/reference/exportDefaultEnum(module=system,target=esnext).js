//// [tests/cases/compiler/exportDefaultEnum.ts] ////

//// [a.ts]
export default enum A {
    A,
    B
}

//// [b.ts]
import A from "./a"

A.A;
A.B;


//// [a.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var A;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            A = {};
            exports_1("default", A);
            (function (A) {
                A[A["A"] = 0] = "A";
                A[A["B"] = 1] = "B";
            })(A);
        }
    };
});
//// [b.js]
System.register(["./a"], function (exports_1, context_1) {
    "use strict";
    var a_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (a_1_1) {
                a_1 = a_1_1;
            }
        ],
        execute: function () {
            a_1.default.A;
            a_1.default.B;
        }
    };
});
