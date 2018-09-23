//// [mergedDeclarations2.ts]
enum Foo {
    b
}
enum Foo {
    a = b
}

module Foo {
    export var x = b
}

//// [mergedDeclarations2.js]
var Foo = Foo || (Foo = {});
(function (Foo) {
    Foo[Foo["b"] = 0] = "b";
})(Foo);
(function (Foo) {
    Foo[Foo["a"] = 0] = "a";
})(Foo);
(function (Foo) {
    Foo.x = b;
})(Foo);
