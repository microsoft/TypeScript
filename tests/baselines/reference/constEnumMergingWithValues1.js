//// [constEnumMergingWithValues1.ts]

function foo() {}
module foo {
    const enum E { X }
}

export = foo

//// [constEnumMergingWithValues1.js]
define(["require", "exports"], function (require, exports) {
    function foo() { }
    return foo;
});
