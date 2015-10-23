//// [m1.ts]

enum foo { A }
module foo {
    const enum E { X }
}

export = foo

//// [m1.js]
define(["require", "exports"], function (require, exports) {
    var foo;
    (function (foo) {
        foo[foo["A"] = 0] = "A";
    })(foo || (foo = {}));
    return foo;
});
