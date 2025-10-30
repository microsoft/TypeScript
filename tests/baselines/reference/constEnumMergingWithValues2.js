//// [tests/cases/compiler/constEnumMergingWithValues2.ts] ////

//// [m1.ts]
class foo {}
namespace foo {
    const enum E { X }
}

export = foo

//// [m1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var foo = /** @class */ (function () {
        function foo() {
        }
        return foo;
    }());
    return foo;
});
