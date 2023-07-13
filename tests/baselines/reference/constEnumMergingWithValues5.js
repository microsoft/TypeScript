//// [tests/cases/compiler/constEnumMergingWithValues5.ts] ////

//// [m1.ts]
module foo {
    const enum E { X }
}

export = foo

//// [m1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var foo;
    (function (foo) {
        var E;
        (function (E) {
            E[E["X"] = 0] = "X";
        })(E || (E = {}));
    })(foo || (foo = {}));
    return foo;
});
