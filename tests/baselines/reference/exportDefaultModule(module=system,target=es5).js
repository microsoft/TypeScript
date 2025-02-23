//// [tests/cases/compiler/exportDefaultModule.ts] ////

//// [a.ts]
export default module A {
    export const Foo = 1;
}

//// [b.ts]
import A from "./a"
A.Foo;


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
                A.Foo = 1;
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
            a_1.default.Foo;
        }
    };
});
