//// [autonumberingInEnums.ts]
enum Foo {
    a = 1
}

enum Foo {
    b // should work fine
}

//// [autonumberingInEnums.js]
var Foo;
(function (Foo) {
    Foo[Foo["a"] = 1] = "a";
})(Foo || (Foo = {}));
(function (Foo) {
    Foo[Foo["b"] = 0] = "b"; // should work fine
})(Foo || (Foo = {}));
