//// [tests/cases/compiler/constEnumMergingWithValues1.ts] ////

//// [m1.ts]
function foo() {}
module foo {
    const enum E { X }
}

export = foo

//// [m1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function foo() { }
    return foo;
});
