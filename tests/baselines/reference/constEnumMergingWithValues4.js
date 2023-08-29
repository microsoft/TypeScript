//// [tests/cases/compiler/constEnumMergingWithValues4.ts] ////

//// [m1.ts]
module foo {
    const enum E { X }
}

module foo {
    var x = 1;
}


export = foo

//// [m1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var foo;
    (function (foo) {
        var x = 1;
    })(foo || (foo = {}));
    return foo;
});
