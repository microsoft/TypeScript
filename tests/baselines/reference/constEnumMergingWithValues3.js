//// [tests/cases/compiler/constEnumMergingWithValues3.ts] ////

//// [m1.ts]
enum foo { A }
namespace foo {
    const enum E { X }
}

export = foo

//// [m1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var foo;
    (function (foo) {
        foo[foo["A"] = 0] = "A";
    })(foo || (foo = {}));
    return foo;
});
