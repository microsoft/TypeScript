//// [mergedDeclarations2.js]
var Foo;
(function (Foo) {
    Foo[Foo["b"] = 0] = "b";
})(Foo || (Foo = {}));
var Foo;
(function (Foo) {
    Foo[Foo["a"] = Foo.b] = "a";
})(Foo || (Foo = {}));

var Foo;
(function (Foo) {
    Foo.x = b;
})(Foo || (Foo = {}));
