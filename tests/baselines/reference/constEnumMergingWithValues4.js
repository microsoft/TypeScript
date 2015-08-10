//// [constEnumMergingWithValues4.ts]

module foo {
    const enum E { X }
}

module foo {
    var x = 1;
}


export = foo

//// [constEnumMergingWithValues4.js]
define(["require", "exports"], function (require, exports) {
    var foo;
    (function (foo) {
        var x = 1;
    })(foo || (foo = {}));
    return foo;
});
