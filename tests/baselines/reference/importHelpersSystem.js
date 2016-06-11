//// [tests/cases/compiler/importHelpersSystem.ts] ////

//// [a.ts]
export class A { }
//// [b.ts]
import { A } from "./a";
export class B extends A { }


//// [a.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var A;
    return {
        setters: [],
        execute: function () {
            A = (function () {
                function A() {
                }
                return A;
            }());
            exports_1("A", A);
        }
    };
});
//// [b.js]
System.register(["tslib", "./a"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tslib_1, a_1, B;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (a_1_1) {
                a_1 = a_1_1;
            }
        ],
        execute: function () {
            B = (function (_super) {
                tslib_1.__extends(B, _super);
                function B() {
                    _super.apply(this, arguments);
                }
                return B;
            }(a_1.A));
            exports_1("B", B);
        }
    };
});
