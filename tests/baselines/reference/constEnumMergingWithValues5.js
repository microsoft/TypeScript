//// [constEnumMergingWithValues5.ts]

module foo {
    const enum E { X }
}

export = foo

//// [constEnumMergingWithValues5.js]
define(["require", "exports"], function (require, exports) {
    var foo;
    (function (foo) {
        var E;
        (function (E) {
            E[E["X"] = 0] = "X";
        })(E || (E = {}));
    })(foo || (foo = {}));
    return foo;
});
