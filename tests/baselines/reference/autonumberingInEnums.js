//// [tests/cases/compiler/autonumberingInEnums.ts] ////

//// [autonumberingInEnums.ts]
enum Foo {
    a = 1
}

enum Foo {
    b
}

//// [autonumberingInEnums.js]
var Foo;
(function (Foo) {
    Foo[Foo["a"] = 1] = "a";
})(Foo || (Foo = {}));
(function (Foo) {
    Foo[Foo["b"] = 0] = "b";
})(Foo || (Foo = {}));
