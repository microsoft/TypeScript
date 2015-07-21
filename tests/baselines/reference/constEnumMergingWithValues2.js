//// [constEnumMergingWithValues2.ts]

class foo {}
module foo {
    const enum E { X }
}

export = foo

//// [constEnumMergingWithValues2.js]
define(["require", "exports"], function (require, exports) {
    var foo = (function () {
        function foo() {
        }
        return foo;
    })();
    return foo;
});
